"use server";

import { Category, categoryToId } from "@/config/category";

import IracingAPI from "iracing-api";
import { env } from "@/env.mjs";

let ir: IracingAPI | undefined = undefined;
let lastLogin: Date | undefined = undefined;

export const getIracingData = async (
  iracingId: string,
  year: number,
  season: number,
  category: Category
) => {
  try {
    const categoryId = categoryToId[category];

    if (!ir) {
      ir = new IracingAPI();
    }

    // Re-login every hour
    if (
      !lastLogin ||
      new Date().getTime() - lastLogin.getTime() > 1000 * 60 * 60
    ) {
      console.log("!!! Logging into iracing");
      await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD);
      lastLogin = new Date();
    }

    const customerId = parseInt(iracingId, 10);

    console.log("!!! Getting iracing data for ", customerId);

    const [memberData, memberRecap, chartData, seasonResults] =
      await Promise.all([
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
    };
  } catch (e) {
    ir = undefined;
    lastLogin = undefined;

    console.log(e);
    return { error: "Error getting iRacing data" };
  }
};
