"use client";

import { FullIratingChart } from "./full-irating-chart";
import { MostRacedWeek } from "./most-raced-week";
import { SeriesStats } from "./series-stats";
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
    <div className="flex w-full flex-col gap-2">
      <FullIratingChart dataPoints={parsed.iratingPoints} />
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-11">
        <div className="lg:col-span-3">
          <MostRacedWeek racesPerWeek={parsed.racesPerWeek} />
        </div>
        {/* <SeriesStats racesPerTrack={parsed.racesPerTrack} /> */}
      </div>
    </div>
  );
};
