"use server";

import { Category, categoryToId } from "@/config/category";

import { getLoggedInIracingAPIClient } from "./store/iracing-api";
import { getRaceResult } from "./get-race-result";

// TODO: Add type from iracing-api
interface Result {
  [key: string]: any;
}

interface Results {
  [subsessionId: string]: Result;
}

interface ExtendedData {
  [customerId: string]: {
    [year: string]: {
      [season: string]: {
        [categoryId: string]: {
          data: Array<Result> | null;
          isFetching: boolean;
          isFetched: boolean;
        };
      };
    };
  };
}

const extendedData: ExtendedData = {};
const iracingResults: Results = {};

export const getExtendedSeasonData = async (
  iracingId: string,
  year: number,
  season: number,
  category: Category
) => {
  const customerId = parseInt(iracingId, 10);
  const categoryId = categoryToId[category];

  try {
    const extended = extendedData[customerId]?.[year]?.[season]?.[categoryId];

    if (extended && extended.isFetched) {
      return { data: extended.data };
    }

    if (extended && extended.isFetching) {
      return { data: null, error: "Data is fetching" };
    }

    extendedData[customerId] = {
      ...extendedData[customerId],
      [year]: {
        ...extendedData[customerId]?.[year],
        [season]: {
          ...extendedData[customerId]?.[year]?.[season],
          [categoryId]: {
            isFetching: true,
            isFetched: false,
            data: null,
          },
        },
      },
    };

    const ir = await getLoggedInIracingAPIClient();

    const races = await ir.searchSeries({
      seasonYear: year,
      seasonQuarter: season,
      customerId,
      officialOnly: true,
      eventTypes: [5],
      categoryIds: [categoryId],
    });

    if (!races?.length) {
      return { data: null, error: "No races found" };
    }

    let results = [];

    for (const race of races) {
      const { subsessionId } = race;

      console.log("getting race result", subsessionId);

      if (iracingResults[subsessionId]) {
        results.push(iracingResults[subsessionId]);
      } else {
        const result = await getRaceResult(race.subsessionId);

        if (result && result.track.categoryId === categoryId) {
          results.push(result);
        }
      }
    }

    extendedData[customerId][year][season][categoryId] = {
      isFetching: false,
      isFetched: true,
      data: results,
    };

    console.log("Finished getting extended data", iracingId, year, season);

    return { data: results };
  } catch (error) {
    console.log(error);

    extendedData[customerId][year][season][categoryId] = {
      isFetching: false,
      isFetched: false,
      data: null,
    };

    return { data: null, error: "Error" };
  }
};
