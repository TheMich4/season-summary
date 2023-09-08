import {
  FullDataParams,
  getFullData,
  isFullDataFetched,
  isFullDataFetching,
  setFullData,
  setFullDataFetching,
} from "../data/full-data.js";

import { getLoggedInIracingAPIClient } from "../client.js";
import { getRaceResult } from "./results.js";

export const getFullSeasonData = async ({
  customerId,
  year,
  season,
  categoryId,
}: FullDataParams) => {
  try {
    console.log("getFullSeasonData", customerId, year, season, categoryId);

    if (!customerId || !year || !season || !categoryId) {
      return null;
    }

    if (isFullDataFetched({ customerId, year, season, categoryId })) {
      console.log("returning already fetched data");
      return {
        data: getFullData({ customerId, year, season, categoryId }),
        error: null,
      };
    }

    if (isFullDataFetching({ customerId, year, season, categoryId })) {
      console.log("data is still fetching");
      return {
        data: null,
        error: "FETCHING",
      };
    }

    const ir = await getLoggedInIracingAPIClient();

    setFullDataFetching({ customerId, year, season, categoryId });

    const races = await ir.searchSeries({
      seasonYear: parseInt(year),
      seasonQuarter: parseInt(season),
      customerId: parseInt(customerId),
      officialOnly: true,
      eventTypes: [5],
      categoryIds: [parseInt(categoryId, 10)],
    });

    if (!races?.length) {
      setFullData(
        { customerId, year, season, categoryId },
        {
          data: [],
          isFetching: false,
          isFetched: true,
        }
      );
      return { data: [], error: "NO_DATA" };
    }

    console.log(
      `Getting ${races.length} races for`,
      customerId,
      year,
      season,
      categoryId
    );

    let results: Array<any> = [];

    const getResult = async (subsessionId: number) => {
      const result: any = await getRaceResult(`${subsessionId}`);

      if (result && result.track.categoryId?.toString() === categoryId) {
        results.push(result);
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      return result;
    };

    // TODO: Temporary try second time
    for (const race of races) {
      const r = await getResult(race.subsessionId);

      if (!r) {
        await getResult(race.subsessionId);
      }
    }

    setFullData(
      { customerId, year, season, categoryId },
      {
        data: results,
        isFetching: false,
        isFetched: true,
      }
    );

    console.log(
      "!!! done getting full data",
      customerId,
      year,
      season,
      categoryId
    );

    return { data: results, error: null };
  } catch (e) {
    console.log(
      "!!! failed getting full seasonData for",
      customerId,
      year,
      season,
      categoryId
    );
    console.error(e);

    setFullData(
      { customerId, year, season, categoryId },
      {
        data: null,
        isFetching: false,
        isFetched: false,
      }
    );

    return { data: null, error: e };
  }
};
