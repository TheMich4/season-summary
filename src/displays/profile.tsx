import { env } from "@/env.mjs"
import IracingAPI from "iracing-api"
import { Frown } from "lucide-react"

import { Favorite } from "@/components/favorite"
import { IracingStats } from "@/components/iracing-stats"
import { IratingChart } from "@/components/irating-chart"
import { MemberRecap } from "@/components/member-recap"
import { RaceList } from "@/components/race-list"
import { SeasonSwitch } from "@/components/season-switch"
import { VisitedManager } from "@/components/visited-manager"

interface ProfileProps {
  iracingId: string
  season?: number
  year?: number
}

const getIracingData = async (
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

export const Profile = async ({
  iracingId,
  season = 2,
  year = 2023,
}: ProfileProps) => {
  const { memberData, memberRecap, chartData, seasonResults } =
    await getIracingData(iracingId, year, season)

  if (!memberRecap || memberRecap.starts === 0) {
    return (
      <div className="flex w-full flex-col gap-2">
        <SeasonSwitch iracingId={iracingId} season={season} year={year} />
        <div className="flex flex-col gap-2 text-center text-3xl justify-center">
          <span className="font-extrabold leading-tight tracking-tighter">
            {memberData?.displayName ?? "This driver"}
          </span>
          <span className="font-semibold">
            {" doesn't have any data for this season"}
          </span>
          <Frown className="mt-2 self-center" size={48} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <VisitedManager
        iracingId={iracingId}
        displayName={memberData?.displayName}
      />

      <SeasonSwitch iracingId={iracingId} season={season} year={year} />

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
      <IratingChart chartData={chartData} />
      <IracingStats chartData={chartData} seasonResults={seasonResults} />
      <RaceList seasonResults={seasonResults} iracingId={iracingId} />
    </div>
  )
}