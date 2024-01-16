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

interface TrackStatsProps {
  racesPerTrack: {
    [trackName: string]: number;
  };
  trackData: AssetData;
}

const Data = ({
  count,
  data,
}: {
  count: number;
  data: Array<{
    trackName: string;
    numberOfRaces: number;
  }>;
}) => {
  return (
    <div className="flex flex-col text-start">
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
  );
};

export const TrackStats = ({ racesPerTrack, trackData }: TrackStatsProps) => {
  const { count, data, slicedData } = useMemo(() => {
    const data = Object.entries(racesPerTrack)
      .map(([trackName, numberOfRaces]) => {
        return {
          trackName,
          numberOfRaces,
        };
      })
      .sort((a, b) => b.numberOfRaces - a.numberOfRaces);
    return {
      count: Object.values(racesPerTrack).length,
      data,
      slicedData: data.slice(0, 5),
    };
  }, [racesPerTrack]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex w-full flex-col gap-2 rounded-md border bg-background/40 p-4 text-start  hover:border-primary/60">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            Most raced tracks
          </p>
          <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
            You raced at
            <p className="font-bold text-foreground dark:text-primary">
              {count}
            </p>
            different tracks this season.
          </div>
          <Data count={count} data={slicedData} />
        </div>
      </DialogTrigger>
      <DialogContent className="2xl:max-[1500px] lg:max-w-[1000px] xl:max-w-[1200px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Track stats</DialogTitle>
          {/* <Data count={count} data={data} /> */}
          <AssetDataTable data={trackData} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
