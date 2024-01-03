"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import ActivityCalendar, {
  ThemeInput,
  type Activity,
} from "react-activity-calendar";

const THEME: ThemeInput = {
  light: ["rgba(0,0,0,0.1)", "hsl(47.9, 95.8%, 53.1%)"],
  dark: ["rgba(0,0,0,1)", "hsl(47.9, 95.8%, 53.1%)"],
};

const getLevel = (count: number, max: number) => {
  if (count === 0) return 0;
  if (count === max) return 4;
  if (count <= max / 3) return 1;
  if (count <= 2 * (max / 3)) return 2;
  if (count < max) return 3;

  return 0;
};

export const ActivityHeatMap = ({ raceResults }: { raceResults: any[] }) => {
  const { resolvedTheme } = useTheme();

  const data = useMemo(() => {
    const racesPerDate = raceResults.reduce((acc, result) => {
      const date = result.startTime.split("T")[0];

      return {
        ...acc,
        [date]: (acc[date] ?? 0) + 1,
      };
    }, {});

    const max = Math.max(...Object.values(racesPerDate));

    return Object.entries(racesPerDate).map(([date, count]) => ({
      date,
      count,
      level: getLevel(count, max),
    })) as Activity[];
  }, [raceResults]);

  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-base font-normal tracking-tight">Activity</p>
      <ActivityCalendar
        colorScheme={resolvedTheme}
        data={data}
        theme={THEME}
        weekStart={2}
        hideColorLegend
        hideMonthLabels
        hideTotalCount
      />
    </div>
  );
};
