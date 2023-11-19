"use client";

import { useMemo } from "react";

interface SeriesStatsProps {
  racesPerSeries: {
    [seriesName: string]: number;
  };
}

export const SeriesStats = ({ racesPerSeries }: SeriesStatsProps) => {
  const { count, data } = useMemo(() => {
    return {
      count: Object.values(racesPerSeries).length,
      data: Object.entries(racesPerSeries)
        .map(([seriesName, numberOfRaces]) => {
          return {
            seriesName,
            numberOfRaces,
          };
        })
        .sort((a, b) => b.numberOfRaces - a.numberOfRaces)
        .slice(0, 5),
    };
  }, [racesPerSeries]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-background/40 p-4 text-start">
      <p className="text-2xl font-semibold leading-none tracking-tight">
        Most raced series
      </p>
      <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
        You raced
        <p className="font-bold text-foreground dark:text-primary">{count}</p>
        different series this season.
      </div>
      <div className="flex flex-col">
        {data.map(({ seriesName, numberOfRaces }) => (
          <div
            className="flex w-full flex-row items-baseline gap-1"
            key={seriesName}
          >
            <p className="min-w-[19px] font-bold dark:text-primary">
              {numberOfRaces}
            </p>
            <p className="text-xs text-muted-foreground">in</p>
            <p className="text-sm">{seriesName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
