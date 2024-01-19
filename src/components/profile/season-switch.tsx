import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const currentSeason = { season: DEFAULT_SEASON, year: DEFAULT_YEAR };

export const SeasonSwitch = ({
  iracingId,
  season,
  year,
  category,
}: {
  iracingId: string;
  season: number;
  year: number;
  category: string | number;
}) => {
  const getPreviousSeason = () => {
    let newSeason = season - 1;
    let newYear = year;

    if (newSeason === 0) {
      newSeason = 4;
      newYear -= 1;
    }

    return `?year=${newYear}&season=${newSeason}&category=${category}`;
  };

  const getNextSeason = () => {
    let newSeason = season + 1;
    let newYear = year;

    if (newSeason === 5) {
      newSeason = 1;
      newYear += 1;
    }

    return `?year=${newYear}&season=${newSeason}&category=${category}`;
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-md">
      <Link href={getPreviousSeason()}>
        <Button
          className="bg-background/40"
          size="xs"
          variant="outline"
          disabled={year === 2010 && season === 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </Link>

      <span>
        <span className="font-bold dark:text-primary">{year}</span>
        {" Season "}
        <span className="font-bold dark:text-primary">{season}</span>
      </span>

      <Link href={getNextSeason()}>
        <Button
          className="bg-background/40"
          size="xs"
          variant="outline"
          disabled={
            currentSeason.season === season && currentSeason.year === year
          }
        >
          <ChevronRight className="size-4" />
        </Button>
      </Link>
    </div>
  );
};
