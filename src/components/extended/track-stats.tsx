"use client";

import { useMemo } from "react";

export const TrackStats = ({ racesPerTrack }) => {
  const { count, data } = useMemo(() => {
    return {
      count: Object.values(racesPerTrack).length,
      data: Object.entries(racesPerTrack)
        .map(([trackName, numberOfRaces]) => {
          return {
            trackName,
            numberOfRaces,
          };
        })
        .sort((a, b) => b.numberOfRaces - a.numberOfRaces)
        .slice(0, 10),
    };
  }, [racesPerTrack]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border p-4 text-start">
      <p className="text-2xl font-semibold leading-none tracking-tight">
        Most raced series
      </p>
      <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
        You raced
        <p className="font-bold text-foreground dark:text-primary">{count}</p>
        different series this season.
      </div>
      <div className="flex flex-col">
        {data.map(({ trackName, numberOfRaces }) => (
          <div
            className="flex w-full flex-row items-baseline gap-1"
            key={trackName}
          >
            <p className="min-w-[19px] font-bold dark:text-primary">
              {numberOfRaces}
            </p>
            <p className="text-xs text-muted-foreground">at</p>
            <p className="text-sm">{trackName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
