"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "./ui/button"

const currentSeason = { season: 2, year: 2023 }

export const SeasonSwitch = () => {
  const [{ season, year }, setSeason] = useState(currentSeason)

  const handleSeasonDown = () => {
    let newSeason = season - 1
    let newYear = year

    if (newSeason === 0) {
      newSeason = 4
      newYear -= 1
    }

    setSeason({ season: newSeason, year: newYear })
  }

  const handleSeasonUp = () => {
    let newSeason = season + 1
    let newYear = year

    if (newSeason === 5) {
      newSeason = 1
      newYear += 1
    }

    setSeason({ season: newSeason, year: newYear })
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
