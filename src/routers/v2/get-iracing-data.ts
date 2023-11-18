import {
  getLoggedInIracingAPIClient,
  resetIracingAPIClient,
} from "../../iracing/client";

import { getParams } from "../../utils/get-params";
import { getPreviousSeason } from "../../utils/get-previous-season";

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

export const getIracingData = async (request: Request) => {
  try {
    const { iracingId, year, season, categoryId } = getParams(request);

    if (!iracingId || !year || !season || !categoryId) {
      return new Response("missing params", { status: 400 });
    }

    const { year: previousYear, season: previousSeason } = getPreviousSeason(
      parseInt(year, 10),
      parseInt(season, 10)
    );

    const ir = await getLoggedInIracingAPIClient();

    console.log(
      "!!! Getting iracing data for ",
      iracingId,
      `(${year}/${season})`
    );

    const [
      memberData,
      memberRecap,
      chartData,
      seasonResults,
      previousSeasonRecap,
    ] = await Promise.all([
      ir.getMemberData({ customerIds: [parseInt(iracingId, 10)] }),
      ir.getMemberRecap({
        customerId: parseInt(iracingId, 10),
        year: parseInt(year, 10),
        season: parseInt(season, 10),
      }),
      ir.getMemberChartData({
        customerId: parseInt(iracingId, 10),
        chartType: 1,
        categoryId: parseInt(categoryId, 10),
      }),
      ir.searchSeries({
        seasonYear: parseInt(year, 10),
        seasonQuarter: parseInt(season, 10),
        customerId: parseInt(iracingId, 10),
        officialOnly: true,
        eventTypes: [5],
        categoryIds: [parseInt(categoryId, 10)],
      }),
      ir.getMemberRecap({
        customerId: parseInt(iracingId, 10),
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

    console.log({ memberData });

    return new Response(
      JSON.stringify({
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
      }),
      { status: 200 }
    );
  } catch (e) {
    resetIracingAPIClient();

    return { error: "Error getting iRacing data" };
  }
};
