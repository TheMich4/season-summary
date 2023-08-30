"use client";

import { Stat } from "./stat";
import { useMemo } from "react";

const keyToName = {
  bestStart: "Best Start",
  worstStart: "Worst Start",
  bestFinish: "Best Finish",
  worstFinish: "Worst Finish",
  mostIncidents: "Most Incidents",
  avgIncidents: "Avg Incidents",
};

export const NewStats = ({
  seasonResults = [],
}: {
  // TODO: types
  seasonResults: Array<any>;
}) => {
  const stats = useMemo(() => {
    return seasonResults.reduce(
      (acc, result, index) => {
        const bestStart =
          !acc.bestStart || result.startingPositionInClass < acc.bestStart
            ? result.startingPositionInClass
            : acc.bestStart;
        const bestFinish =
          !acc.bestFinish || result.finishPositionInClass < acc.bestFinish
            ? result.finishPositionInClass
            : acc.bestFinish;
        const worstStart =
          !acc.worstStart || result.startingPositionInClass > acc.worstStart
            ? result.startingPositionInClass
            : acc.worstStart;
        const worstFinish =
          !acc.worstFinish || result.finishPositionInClass > acc.worstFinish
            ? result.finishPositionInClass
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
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
      {Object.entries(stats).map(([key, value]) => {
        return <Stat name={keyToName[key]} value={value} key={key} />;
      })}
    </div>
  );
};
