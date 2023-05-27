"use client"

import { useState } from "react"
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
  season: _season,
  year: _year,
}: {
  iracingId: string
  season?: number
  year?: number
}) => {
  const router = useRouter()

  const [{ season, year }, setSeason] = useState(getSeason(_year, _season))

  const handleSeasonDown = () => {
    let newSeason = season - 1
    let newYear = year

    if (newSeason === 0) {
      newSeason = 4
      newYear -= 1
    }

    setSeason({ season: newSeason, year: newYear })

    router.push(`${iracingId}/${newYear}/${newSeason}`)
  }

  const handleSeasonUp = () => {
    let newSeason = season + 1
    let newYear = year

    if (newSeason === 5) {
      newSeason = 1
      newYear += 1
    }

    setSeason({ season: newSeason, year: newYear })

    router.push(`${iracingId}/${newYear}/${newSeason}`)
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-md">
      <Button
        size="xs"
        variant="outline"
        onClick={handleSeasonDown}
        disabled={year === 2010 && season === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span>
        <span className="font-bold">{year}</span>
        {" Season "}
        <span className="font-bold">{season}</span>
      </span>

      <Button
        size="xs"
        variant="outline"
        disabled={
          currentSeason.season === season && currentSeason.year === year
        }
        onClick={handleSeasonUp}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
