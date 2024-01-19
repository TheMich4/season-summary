"use client";

import { Stat } from "./stat";
import { useMemo } from "react";

const keyToName = new Proxy(
  {
    bestStart: "Best Start",
    worstStart: "Worst Start",
    bestFinish: "Best Finish",
    worstFinish: "Worst Finish",
    mostIncidents: "Most Incidents",
    avgIncidents: "Avg Incidents",
  } as const,
  {
    get: (target, prop: string) => {
      return target[prop as keyof Stats] ?? prop;
    },
  }
);

interface Stats {
  bestStart: number | null;
  worstStart: number | null;
  bestFinish: number | null;
  worstFinish: number | null;
  mostIncidents: number | null;
  avgIncidents: number;
}

export const NewStats = ({
  seasonResults = [],
}: {
  // TODO: types
  seasonResults: Array<any>;
}) => {
  const stats: Stats = useMemo(() => {
    return seasonResults.reduce(
      (acc, result, index) => {
        const start = result.startingPositionInClass + 1;
        const finish = result.finishPositionInClass + 1;

        const bestStart =
          !acc.bestStart || start < acc.bestStart ? start : acc.bestStart;
        const bestFinish =
          !acc.bestFinish || finish < acc.bestFinish ? finish : acc.bestFinish;
        const worstStart =
          !acc.worstStart || start > acc.worstStart ? start : acc.worstStart;
        const worstFinish =
          !acc.worstFinish || finish > acc.worstFinish
            ? finish
            : acc.worstFinish;
        const mostIncidents =
          !acc.mostIncidents || result.incidents > acc.mostIncidents
            ? result.incidents
            : acc.mostIncidents;
        const avgIncidents =
          result.incidents > 0
            ? Math.round(
                (seasonResults
                  .slice(0, index + 1)
                  .reduce((a, b) => a + b.incidents, 0) /
                  (index + 1)) *
                  100
              ) / 100
            : acc.avgIncidents;

        return {
          ...acc,
          bestStart,
          worstStart,
          bestFinish,
          worstFinish,
          mostIncidents,
          avgIncidents,
        };
      },
      {
        bestStart: null,
        bestFinish: null,
        worstStart: null,
        worstFinish: null,
        mostIncidents: null,
        avgIncidents: 0,
      }
    );
  }, [seasonResults]);

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6">
      {Object.entries(stats).map(([key, value]) => (
        <Stat name={keyToName[key as keyof Stats]} value={value} key={key} />
      ))}
    </div>
  );
};
