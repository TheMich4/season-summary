import { env } from "@/env.mjs"
import IracingAPI from "iracing-api"

import { Favorite } from "@/components/favorite"
import { MemberRecap } from "@/components/member-recap"
import { SeasonSwitch } from "@/components/season-switch"

interface ProfileProps {
  iracingId: string
}

const getIracingData = async (iracingId: string) => {
  const ir = new IracingAPI()
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD)

  const [memberData, memberRecap] = await Promise.all([
    ir.getMemberData({ customerIds: [parseInt(iracingId, 10)] }),
    ir.getMemberRecap({
      customerId: parseInt(iracingId, 10),
      year: 2023,
      season: 2,
    }),
  ])

  return {
    memberData: memberData?.members?.[0],
    memberRecap: memberRecap?.stats,
  }
}

export const Profile = async ({ iracingId }: ProfileProps) => {
  const { memberData, memberRecap } = await getIracingData(iracingId)

  return (
    <div className="flex w-full flex-col gap-2">
      <SeasonSwitch />

      <div className="flex flex-col justify-center gap-2 md:flex-row">
        <div className="text-3xl font-extrabold leading-tight tracking-tighter text-center">
          {memberData?.displayName}
        </div>
        <div className="flex items-center justify-center text-end text-sm text-secondary">
          ({memberData?.clubName})
        </div>
      </div>

      <MemberRecap memberRecap={memberRecap} />

      <Favorite memberRecap={memberRecap} />
    </div>
  )
}
