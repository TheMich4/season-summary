"use client";

import { FullIratingChart } from "./full-irating-chart";
import { MostRacedWeek } from "./most-raced-week";
import { parseExtendedData } from "@/lib/extended-data";
import { useMemo } from "react";

export const Test = ({ data, iracingId }) => {
  const parsed = useMemo(
    () => data && parseExtendedData(data.results, iracingId),
    [data]
  );

  // console.log({ data, parsed });

  if (!parsed) {
    return null;
  }

  return (
    <div className="w-full">
      <FullIratingChart dataPoints={parsed.iratingPoints} />
      <MostRacedWeek racesPerWeek={parsed.racesPerWeek} />
    </div>
  );
};
