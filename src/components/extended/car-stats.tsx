"use client";

import { useMemo } from "react";

export const CarStats = ({ racesPerCar }) => {
  const { count, data } = useMemo(() => {
    return {
      count: Object.values(racesPerCar).length,
      data: Object.entries(racesPerCar)
        .map(([carName, numberOfRaces]) => {
          return {
            carName,
            numberOfRaces,
          };
        })
        .sort((a, b) => b.numberOfRaces - a.numberOfRaces)
        .slice(0, 5),
    };
  }, [racesPerCar]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border p-4 text-start">
      <p className="text-2xl font-semibold leading-none tracking-tight">
        Most raced tracks
      </p>
      <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
        You raced at
        <p className="font-bold text-foreground dark:text-primary">{count}</p>
        different tracks this season.
      </div>
      <div className="flex flex-col">
        {data.map(({ carName, numberOfRaces }) => (
          <div
            className="flex w-full flex-row items-baseline gap-1"
            key={carName}
          >
            <p className="min-w-[19px] font-bold dark:text-primary">
              {numberOfRaces}
            </p>
            <p className="text-xs text-muted-foreground">at</p>
            <p className="text-sm">{carName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
