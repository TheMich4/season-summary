"use server";

import { Category, categoryToId } from "@/config/category";

import { getIracingData } from "../get-iracing-data";

interface IracingData {
  [iracingId: string]: {
    [year: string]: {
      [season: string]: {
        // TODO: Add types
        [categoryId: string]: {
          data: Record<string, any>;
          lastFetch: Date;
          // TODO: Add isSeasonOver functionality
          isSeasonOver: boolean;
        };
      };
    };
  };
}

const iracingData: IracingData = {};

export const getSeasonData = async (
  iracingId: string,
  year: string,
  season: string,
  category: Category
) => {
  const categoryId = categoryToId[category];
  const seasonData = iracingData[iracingId]?.[year]?.[season]?.[categoryId];

  const getData = async () => {
    return await getIracingData(
      iracingId,
      parseInt(year, 10),
      parseInt(season, 10),
      category
    );
  };

  const shouldFetch = () =>
    !seasonData ||
    // Refresh after 24 hours
    (new Date().getTime() - seasonData.lastFetch.getTime() >
      1000 * 60 * 60 * 24 &&
      !seasonData.isSeasonOver);

  if (shouldFetch()) {
    console.log("!!! Fetching data for", iracingId, `(${year}/${season})`);
    const data = await getData();
    const thisSeasonData = {
      data,
      lastFetch: new Date(),
      // TODO: Add handling for isSeasonOver
      isSeasonOver: false,
    };

    iracingData[iracingId] = {
      ...iracingData[iracingId],
      [year]: {
        ...iracingData[iracingId]?.[year],
        [season]: {
          ...iracingData[iracingId]?.[year]?.[season],
          [categoryId]: thisSeasonData,
        },
      },
    };

    return thisSeasonData;
  }

  return seasonData;
};
