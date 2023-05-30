"use client";

import { useMemo } from "react";
import { Frown } from "lucide-react";

import { Stat } from "./stat";

export const IracingStats = ({
  seasonResults,
  chartData,
}: {
  seasonResults;
  chartData;
}) => {
  const { busiestDay, mostRaces } = useMemo(() => {
    const racesPerDay = seasonResults.reduce((acc, result) => {
      const date = result.startTime.split("T")[0] as string;
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const [busiestDay, mostRaces] = Object.entries(racesPerDay).reduce(
      ([date, count], [currentDate, currentCount]) => {
        if (currentCount > count) {
          return [currentDate, currentCount];
        } else {
          return [date, count];
        }
      },
      ["", -1]
    );

    return {
      busiestDay,
      mostRaces: mostRaces.toString(),
    };
  }, [seasonResults]);

  const { startIR, finishIR, delta } = useMemo(() => {
    const startIR = chartData[0]?.value || "Unknown";
    const finishIR = chartData[chartData.length - 1]?.value || "Unknown";
    const delta = finishIR - startIR;
    return { startIR, finishIR, delta };
  }, [chartData]);

  const FinishIRNode = useMemo(() => {
    if (isNaN(delta) || delta === 0) return finishIR;
    if (delta > 0) {
      return (
        <>
          {finishIR}
          <span className="ml-1 flex self-center text-sm text-green-600">
            (+{delta})
          </span>
        </>
      );
    } else {
      return (
        <>
          {finishIR}
          <span className="ml-1 flex self-center text-sm text-red-600">
            ({delta})
          </span>
        </>
      );
    }
  }, [finishIR, delta]);

  if (!seasonResults?.length)
    return (
      <div className="flex flex-row gap-2 self-center text-center text-xl">
        <span>{"You don't have any data for this category"}</span>
        <Frown className="h-5 w-5 self-center" />
      </div>
    );

  return (
    <div className="grid w-full grid-cols-1 grid-rows-4 gap-2 sm:grid-cols-2 sm:grid-rows-2  md:grid-cols-4 md:grid-rows-1">
      <Stat name="Busiest day" value={busiestDay} />
      <Stat name="Most races" value={mostRaces} />
      <Stat name="Start iRating" value={startIR} />
      <Stat name="Finish iRating" value={FinishIRNode} />
    </div>
  );
};
