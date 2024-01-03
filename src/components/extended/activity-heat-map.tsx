"use client";

import { useMemo } from "react";
import ActivityCalendar, { type Activity } from "react-activity-calendar";

export const ActivityHeatMap = ({ raceResults }: { raceResults: any[] }) => {
  const data = useMemo(() => {
    const racesPerDate = raceResults.reduce((acc, result) => {
      const date = result.startTime.split("T")[0];

      return {
        ...acc,
        [date]: (acc[date] ?? 0) + 1,
      };
    }, {});

    return Object.entries(racesPerDate).map(([date, count]) => ({
      date,
      count,
      level: 4 / count,
    })) as Activity[];
  }, [raceResults]);

  return <ActivityCalendar data={data} />;
};
