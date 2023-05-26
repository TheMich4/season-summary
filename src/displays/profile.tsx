import { SeasonSwitch } from "@/components/season-switch"

interface ProfileProps {
  iracingId: string
}

export const Profile = async ({ iracingId }) => {
  return (
    <div>
      <SeasonSwitch />
    </div>
  )
}
