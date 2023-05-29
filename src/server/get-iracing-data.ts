"use server"

import { env } from "@/env.mjs"
import IracingAPI from "iracing-api"

export const getIracingData = async (
  iracingId: string,
  year: number,
  season: number
) => {
  const ir = new IracingAPI({ timeout: 20000 })
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD)

  const customerId = parseInt(iracingId, 10)

  const [memberData, memberRecap, chartData, seasonResults] = await Promise.all(
    [
      ir.getMemberData({ customerIds: [customerId] }),
      ir.getMemberRecap({
        customerId,
        year,
        season,
      }),
      ir.getMemberChartData({
        customerId,
        chartType: 1,
        categoryId: 2,
      }),
      ir.searchSeries({
        seasonYear: year,
        seasonQuarter: season,
        customerId,
        officialOnly: true,
        eventTypes: [5],
      }),
    ]
  )

  const firstRaceDate = new Date(
    seasonResults?.[0]?.startTime?.split("T")[0] as string
  )
  const lastRaceDate = new Date(
    seasonResults?.[seasonResults?.length - 1]?.startTime?.split(
      "T"
    )[0] as string
  )

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
  }
}
