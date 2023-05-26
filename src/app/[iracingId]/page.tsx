import { Suspense } from "react"
import { Profile } from "@/displays/profile"

import { SeasonSwitch } from "@/components/season-switch"

interface DriverPageProps {
  params: {
    iracingId: string
  }
}

export default function DriverPage({ params: { iracingId } }: DriverPageProps) {
  console.log({ iracingId })
  return (
    <div className="container grid items-center justify-center gap-2 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Profile iracingId={iracingId} />
      </Suspense>
    </div>
  )
}
