import { Suspense } from "react"
import { Profile } from "@/displays/profile"

interface DriverPageProps {
  params: {
    iracingId: string
  }
}

export default function DriverPage({ params: { iracingId } }: DriverPageProps) {
  return (
    <div className="container grid items-center justify-center gap-2 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-ignore Server component */}
        <Profile iracingId={iracingId} />
      </Suspense>
    </div>
  )
}
