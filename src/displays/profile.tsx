import { env } from "@/env.mjs"
import IracingAPI from "iracing-api"

import { Favorite } from "@/components/favorite"
import { IracingStats } from "@/components/iracing-stats"
import { IratingChart } from "@/components/irating-chart"
import { MemberRecap } from "@/components/member-recap"
import { SeasonSwitch } from "@/components/season-switch"

interface ProfileProps {
  iracingId: string
}

const getIracingData = async (iracingId: string) => {
  const ir = new IracingAPI({ timeout: 10000 })
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD)

  const customerId = parseInt(iracingId, 10)

  const [memberData, memberRecap, chartData, seasonResults] = await Promise.all(
    [
      ir.getMemberData({ customerIds: [customerId] }),
      ir.getMemberRecap({
        customerId,
        year: 2023,
        season: 2,
      }),
      ir.getMemberChartData({
        customerId,
        chartType: 1,
        categoryId: 2,
      }),
      ir.searchSeries({
        seasonYear: 2023,
        seasonQuarter: 2,
        customerId,
        officialOnly: true,
        eventTypes: [5],
      }),
    ]
  )

  const firstRaceDate = new Date(
    seasonResults?.[0]?.startTime?.split("T")[0] as string
  )

  return {
    memberData: memberData?.members?.[0],
    memberRecap: memberRecap?.stats,
    chartData: firstRaceDate
      ? chartData?.data?.filter(
          (cd: { when: string; value: number }) =>
            new Date(cd.when) > firstRaceDate
        )
      : [],
    seasonResults,
  }
}

export const Profile = async ({ iracingId }: ProfileProps) => {
  const { memberData, memberRecap, chartData, seasonResults } =
    await getIracingData(iracingId)

  return (
    <div className="flex w-full flex-col gap-2">
      <SeasonSwitch />

      <div className="flex flex-col justify-center gap-2 md:flex-row">
        <div className="text-center text-3xl font-extrabold leading-tight tracking-tighter">
          {memberData?.displayName}
        </div>
        <div className="flex items-center justify-center text-end text-sm text-secondary">
          ({memberData?.clubName})
        </div>
      </div>

      <MemberRecap memberRecap={memberRecap} />
      <Favorite memberRecap={memberRecap} />
      {/* <IratingChart chartData={chartData} />
      <IracingStats chartData={chartData} seasonResults={seasonResults} /> */}
    </div>
  )
}
