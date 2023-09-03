"use server";

import { Category, categoryToId } from "@/config/category";
import {
  getLoggedInIracingAPIClient,
  resetIracingAPIClient,
} from "./store/iracing-api";

import { getPreviousSeason } from "@/lib/season";

const getPreviousSeasonStats = (
  memberRecap: Record<string, any> | undefined
) => {
  if (!memberRecap) {
    return {};
  }

  return {
    avgFinishPosition: memberRecap.avgFinishPosition,
    avgStartPosition: memberRecap.avgStartPosition,
    laps: memberRecap.laps,
    lapsLed: memberRecap.lapsLed,
    starts: memberRecap.starts,
    top5: memberRecap.top5,
    wins: memberRecap.wins,
  };
};

export const getIracingData = async (
  iracingId: string,
  year: number,
  season: number,
  category: Category
) => {
  try {
    const categoryId = categoryToId[category];
    const customerId = parseInt(iracingId, 10);
    const { year: previousYear, season: previousSeason } = getPreviousSeason(
      year,
      season
    );

    const ir = await getLoggedInIracingAPIClient();

    console.log(
      "!!! Getting iracing data for ",
      customerId,
      `(${year}/${season})`
    );

    const [
      memberData,
      memberRecap,
      chartData,
      seasonResults,
      previousSeasonRecap,
    ] = await Promise.all([
      ir.getMemberData({ customerIds: [customerId] }),
      ir.getMemberRecap({
        customerId,
        year,
        season,
      }),
      ir.getMemberChartData({
        customerId,
        chartType: 1,
        categoryId,
      }),
      ir.searchSeries({
        seasonYear: year,
        seasonQuarter: season,
        customerId,
        officialOnly: true,
        eventTypes: [5],
        categoryIds: [categoryId],
      }),
      ir.getMemberRecap({
        customerId,
        year: previousYear,
        season: previousSeason,
      }),
    ]);

    const firstRaceDate = new Date(
      seasonResults?.[0]?.startTime?.split("T")[0]
    );
    const lastRaceDate = new Date(
      seasonResults?.[seasonResults?.length - 1]?.startTime?.split("T")[0]
    );

    const firstRace =
      firstRaceDate &&
      seasonResults?.[0] &&
      (await ir.getResult({
        subsessionId: seasonResults[0].subsessionId,
      }));

    const lastRace =
      lastRaceDate &&
      seasonResults?.[seasonResults?.length - 1] &&
      (await ir.getResult({
        subsessionId: seasonResults?.[seasonResults?.length - 1].subsessionId,
      }));

    const previousSeasonStats = getPreviousSeasonStats(
      previousSeasonRecap?.stats as any
    );

    return {
      memberData: memberData?.members?.[0],
      memberRecap: memberRecap?.stats,
      chartData: firstRaceDate
        ? chartData?.data?.filter(
            (cd: { when: string; value: number }) =>
              new Date(cd.when) > firstRaceDate &&
              new Date(cd.when) < lastRaceDate
          )
        : [],
      seasonResults,
      firstRace,
      lastRace,
      previousSeasonStats,
    };
  } catch (e) {
    resetIracingAPIClient();

    return { error: "Error getting iRacing data" };
  }
};
