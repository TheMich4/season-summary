import IracingAPI from "iracing-api"

import { SeasonSwitch } from "@/components/season-switch"

interface ProfileProps {
  iracingId: string
}

const getIracingData = async (iracingId: string) => {
  const ir = new IracingAPI()
  await ir.login()
}

export const Profile = async ({ iracingId }: ProfileProps) => {
  return (
    <div>
      <SeasonSwitch />
    </div>
  )
}
