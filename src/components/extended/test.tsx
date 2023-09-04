"use client";

import { parseExtendedData } from "@/lib/extended-data";
import { useMemo } from "react";

export const Test = ({ data, iracingId }) => {
  const parsed = useMemo(() => parseExtendedData(data.results, iracingId), []);

  console.log({ data, parsed });
  return (
    <div className="w-full">
      <pre>{JSON.stringify(parsed, null, 2)}</pre>
    </div>
  );
};
