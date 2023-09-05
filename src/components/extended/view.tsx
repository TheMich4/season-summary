"use client";

import { FullIratingChart } from "./full-irating-chart";
import { FullSafetyRatingChart } from "./full-safety-rating-chart";
import { MostRacedWeek } from "./most-raced-week";
import { SeriesStats } from "./series-stats";
import { Skeleton } from "../ui/skeleton";
import { TrackStats } from "./track-stats";
import { parseExtendedData } from "@/lib/extended-data";
import { useMemo } from "react";

export const View = ({ data, iracingId }) => {
  const parsed = useMemo(
    () => data && parseExtendedData(data.results, iracingId),
    [data]
  );

  // console.log({ data, parsed });

  if (!parsed) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FullIratingChart dataPoints={parsed.iratingPoints} />
        <FullSafetyRatingChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <div className="lg:col-span-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <MostRacedWeek racesPerWeek={parsed.racesPerWeek} />
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
            </div>
          </div>
        </div>
        <div className="grid lg:col-span-5 lg:grid-cols-2">
          <div className="col-span-2 flex flex-col gap-4">
            <SeriesStats racesPerSeries={parsed.racesPerSeries} />
            <TrackStats racesPerTrack={parsed.racesPerTrack} />
            <div className="flex flex-col gap-4 lg:flex-row">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};