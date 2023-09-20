import { getLoggedInIracingAPIClient } from "../client.js";
import { getRaceResult } from "./results.js";
import { getSeasonData } from "../../db/actions/get-season-data.js";
import { parseResults } from "../parse-results/index.js";
import { prisma } from "../../db/index.js";

export const getFullSeasonData = async ({
  customerId,
  year,
  season,
  categoryId,
}: {
  customerId: string;
  year: string;
  season: string;
  categoryId: string;
}) => {
  console.log("getFullSeasonData", customerId, year, season, categoryId);

  if (!customerId || !year || !season || !categoryId) {
    return null;
  }

  const seasonData = await getSeasonData(
    parseInt(customerId, 10),
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!seasonData) {
    console.log(
      "Failed to get seasonData",
      customerId,
      year,
      season,
      categoryId
    );
    return null;
  }

  console.log({ lr: seasonData.lastRace });

  try {
    if (seasonData.data) {
      return { data: seasonData.data, error: null };
    }

    if (seasonData.isPending) {
      return { data: null, error: "FETCHING" };
    }

    const ir = await getLoggedInIracingAPIClient();

    await prisma.seasonData.update({
      where: {
        id: seasonData.id,
      },
      data: {
        isPending: true,
      },
    });

    const races = await ir.searchSeries({
      seasonYear: parseInt(year),
      seasonQuarter: parseInt(season),
      customerId: parseInt(customerId),
      officialOnly: true,
      eventTypes: [5],
      categoryIds: [parseInt(categoryId, 10)],
    });

    if (!races?.length) {
      await prisma.seasonData.update({
        where: {
          id: seasonData.id,
        },
        data: {
          isPending: false,
          data: [],
        },
      });

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

      // await new Promise((resolve) => setTimeout(resolve, 3000));

      return result;
    };

    // TODO: Temporary try second time
    // TODO: Start from seasonData.lastRace + 1
    for (const race of races) {
      const r = await getResult(race.subsessionId);

      if (!r) {
        await getResult(race.subsessionId);
      }
    }

    // TODO: Add db data
    const data = parseResults(results, customerId);

    const lastRace = results[results.length - 1]?.raceSummary.subsessionId;

    await prisma.seasonData.update({
      where: {
        id: seasonData.id,
      },
      data: {
        isPending: false,
        data,
        lastRace: lastRace && `${lastRace}`,
      },
    });

    console.log(
      "!!! done getting full data",
      customerId,
      year,
      season,
      categoryId
    );

    return { data, error: null };
  } catch (e) {
    console.log(
      "!!! failed getting full seasonData for",
      customerId,
      year,
      season,
      categoryId
    );
    console.error(e);

    await prisma.seasonData.update({
      where: {
        id: seasonData.id,
      },
      data: {
        isPending: false,
        data: [],
      },
    });

    return { data: null, error: e };
  }
};
