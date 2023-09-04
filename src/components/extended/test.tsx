"use client";

import { FullIratingChart } from "./full-irating-chart";
import { parseExtendedData } from "@/lib/extended-data";
import { useMemo } from "react";

export const Test = ({ data, iracingId }) => {
  const parsed = useMemo(
    () => data && parseExtendedData(data.results, iracingId),
    [data]
  );

  console.log({ data, parsed });
  return (
    <div className="w-full">
      <FullIratingChart dataPoints={parsed.iratingPoints} />
    </div>
  );
};
