import { SeasonSwitch } from "@/components/season-switch"

export const ProfileLoading = ({
  iracingId,
  season = 2,
  year = 2023,
}: {
  iracingId: string
  season?: number
  year?: number
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <SeasonSwitch iracingId={iracingId} season={season} year={year} />
      <div className="align-center flex flex-row gap-2 text-2xl font-semibold">
        {"Loading stats for: "}
        <span className="self-center font-extrabold leading-tight tracking-tighter">
          {iracingId}
        </span>
      </div>
    </div>
  )
}
