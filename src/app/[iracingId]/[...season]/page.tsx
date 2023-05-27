import { Suspense } from "react"
import { Profile } from "@/displays/profile"

interface DriverPageProps {
  params: {
    iracingId: string
    season: [string, string]
  }
}

export default function DriverPage({
  params: { iracingId, season },
}: DriverPageProps) {
  return (
    <div className="container grid items-center justify-center gap-2 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-ignore Server component */}
        <Profile
          iracingId={iracingId}
          year={parseInt(season[0])}
          season={parseInt(season[1])}
        />
      </Suspense>
    </div>
  )
}
