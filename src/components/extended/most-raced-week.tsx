"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useMemo } from "react";

const WeekList = ({
  racesPerWeek,
}: {
  racesPerWeek: Record<string, number>;
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-1 grid grid-cols-2 items-baseline gap-2">
        <p className="text-md font-bold">WEEK</p>
        <p className="text-md font-bold">RACES</p>
      </div>
      {Object.entries(racesPerWeek).map(([week, numberOfRaces]) => (
        <div className="grid grid-cols-2 items-baseline gap-2" key={week}>
          <p className="text-md flex justify-center text-foreground/80">
            {week}
          </p>
          <p className="text-md flex justify-center font-bold dark:text-primary">
            {numberOfRaces}
          </p>
        </div>
      ))}
    </div>
  );
};

export const MostRacedWeek = ({
  racesPerWeek,
}: {
  racesPerWeek: Record<string, number>;
}) => {
  const mostRacedWeek = useMemo(() => {
    return Object.entries(racesPerWeek).reduce(
      (acc, [week, numberOfRaces]) => {
        if (numberOfRaces > acc.numberOfRaces) {
          return {
            week,
            numberOfRaces,
          };
        }
        return acc;
      },
      {
        week: "",
        numberOfRaces: 0,
      }
    );
  }, [racesPerWeek]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex max-w-fit flex-col rounded-md border p-2">
            <p className="text-xl font-bold tracking-tighter">
              Most raced week:
            </p>
            <div className="flex flex-row items-baseline justify-center gap-1">
              <p className="text-xl font-bold">{mostRacedWeek.week}</p>
              <p className="text-sm text-foreground/80">
                ({mostRacedWeek.numberOfRaces} races)
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex md:hidden">
          <WeekList racesPerWeek={racesPerWeek} />
        </TooltipContent>
        <TooltipContent side="right" className="hidden md:flex">
          <WeekList racesPerWeek={racesPerWeek} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
