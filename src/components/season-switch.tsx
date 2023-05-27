"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "./ui/button"

const currentSeason = { season: 2, year: 2023 }

const getSeason = (year?: number, season?: number) => {
  if (year && season) {
    return { year, season }
  }

  return currentSeason
}

export const SeasonSwitch = ({
  iracingId,
  season,
  year,
}: {
  iracingId: string
  season: number
  year: number
}) => {
  const router = useRouter()

  const getPreviousSeason = () => {
    let newSeason = season - 1
    let newYear = year

    if (newSeason === 0) {
      newSeason = 4
      newYear -= 1
    }

    return `${newYear}/${newSeason}`
  }

  const getNextSeason = () => {
    let newSeason = season + 1
    let newYear = year

    if (newSeason === 5) {
      newSeason = 1
      newYear += 1
    }

    return `${newYear}/${newSeason}`
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-md">
      <Link href={`/${iracingId}/${getPreviousSeason()}`} prefetch>
        <Button
          size="xs"
          variant="outline"
          disabled={year === 2010 && season === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <span>
        <span className="font-bold">{year}</span>
        {" Season "}
        <span className="font-bold">{season}</span>
      </span>

      <Link href={`/${iracingId}/${getNextSeason()}`} prefetch>
        <Button
          size="xs"
          variant="outline"
          disabled={
            currentSeason.season === season && currentSeason.year === year
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
