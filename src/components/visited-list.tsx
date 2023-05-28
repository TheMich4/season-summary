"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "./ui/button"
import { useVisited } from "./visited-provider"

export const VisitedList = () => {
  const { visited } = useVisited()

  return (
    <div>
      <div className="text-center text-2xl font-bold md:text-start">
        Recently Visited:
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {visited
          .slice(0, 10)
          .filter(({ iracingId, name }) => iracingId && name)
          .map(({ iracingId, name }) => (
            <div className="flex flex-row justify-between rounded-md border p-2">
              <div className="flex flex-col">
                <div className="font-bold">{name}</div>
                <div className="text-sm">({iracingId})</div>
              </div>
              <div className="flex items-center">
                <Link href={`${iracingId}`}>
                  <Button size="sm" variant="ghost">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
