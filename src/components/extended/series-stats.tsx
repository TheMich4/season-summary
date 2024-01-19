"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useMemo } from "react";
import { AssetDataTable } from "./data-table";

interface SeriesStatsProps {
  racesPerSeries: {
    [seriesName: string]: number;
  };
  seriesData: AssetData;
}

const Data = ({
  count,
  data,
}: {
  count: number;
  data: Array<{
    seriesName: string;
    numberOfRaces: number;
  }>;
}) => {
  return (
    <div className="flex flex-col text-start">
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
  );
};

export const SeriesStats = ({
  racesPerSeries,
  seriesData,
}: SeriesStatsProps) => {
  const { count, data, slicedData } = useMemo(() => {
    const data = Object.entries(racesPerSeries)
      .map(([seriesName, numberOfRaces]) => {
        return {
          seriesName,
          numberOfRaces,
        };
      })
      .sort((a, b) => b.numberOfRaces - a.numberOfRaces);
    return {
      count: Object.values(racesPerSeries).length,
      data,
      slicedData: data.slice(0, 5),
    };
  }, [racesPerSeries]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex w-full flex-col gap-2 rounded-md border bg-background/40 p-4 text-start hover:border-primary/60">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            Most raced series
          </p>
          <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
            You raced
            <p className="font-bold text-foreground dark:text-primary">
              {count}
            </p>
            different series this season.
          </div>
          <Data count={count} data={slicedData} />
        </div>
      </DialogTrigger>
      <DialogContent className="2xl:max-[1500px] h-full max-h-[80%] overflow-hidden lg:max-w-[1000px] xl:max-w-[1200px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Series stats</DialogTitle>
        </DialogHeader>

        <AssetDataTable data={seriesData} />
      </DialogContent>
    </Dialog>
  );
};
