"use client";

import { Frown } from "lucide-react";
import { Stat } from "./stat";
import { categoryToName } from "@/config/category";
import { useConfig } from "../providers/config-provider";
// TODO: Type from iracing-api
// import { type Result } from "iracing-api/lib/types/results";
import { useMemo } from "react";

interface Result {
  [key: string]: any;
}

interface IracingStatsProps {
  seasonResults: Array<Result>;
  chartData: any;
  firstRace: Result | undefined;
  lastRace: Result | undefined;
  iracingId: string;
}

// TODO: Fix when iracing-api type is updated
// TODO: Refactor
const getPlayerRaceResult = (result: Result, iracingId: string) => {
  if (!result) return undefined;

  const raceResult = result.sessionResults.find(
    (sr: any) => sr.simsessionType === 3
  );

  const playerResult = raceResult?.results.find(
    (r: any) => `${r.custId}` === iracingId
  );

  if (playerResult) return playerResult;

  // Team event
  return raceResult?.results.flatMap(
    (r: any) =>
      r.driverResults?.find((dr: any) => `${dr.custId}` === iracingId) ?? []
  )?.[0];
};

export const IracingStats = ({
  seasonResults,
  chartData,
  firstRace,
  lastRace,
  iracingId,
}: IracingStatsProps) => {
  const { category } = useConfig();

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
    const startIR =
      (firstRace && getPlayerRaceResult(firstRace, iracingId)?.oldiRating) ??
      chartData[0]?.value ??
      "Unknown";
    const finishIR =
      (lastRace && getPlayerRaceResult(lastRace, iracingId)?.newiRating) ??
      chartData[chartData.length - 1]?.value ??
      "Unknown";
    const delta = finishIR - startIR ?? 0;

    return { startIR, finishIR, delta };
  }, [firstRace, lastRace, chartData, iracingId]);

  if (!seasonResults?.length)
    return (
      <span className="flex flex-row gap-2 self-center text-center text-xl">
        <span>{`You don't have any ${categoryToName[category]} data for this season`}</span>
        <Frown className="h-5 w-5 self-center" />
      </span>
    );

  return (
    <div className="grid w-full grid-cols-1 grid-rows-4 gap-2 sm:grid-cols-2 sm:grid-rows-2  md:grid-cols-4 md:grid-rows-1">
      <Stat name="Busiest day" value={busiestDay} />
      <Stat name="Most races" value={mostRaces} />
      <Stat name="Start iRating" value={startIR} />
      <Stat name="Finish iRating" value={finishIR} previous={startIR} />
    </div>
  );
};
