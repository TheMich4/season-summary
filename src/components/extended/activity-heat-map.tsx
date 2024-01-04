"use client";

import { SEASON_DATE_RANGES } from "@/config/iracing";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import ActivityCalendar, {
  ThemeInput,
  type Activity,
} from "react-activity-calendar";

interface ActivityHeatMapProps {
  raceResults: any[];
  season: string;
  year: string;
}

const THEME: ThemeInput = {
  light: [
    "rgba(250, 250, 250, 0.60)",
    "rgba(250, 204, 21, 0.25)",
    "rgba(250, 204, 21, 0.50)",
    "rgba(250, 204, 21, 0.75)",
    "rgba(250, 204, 21, 1)",
  ],
  dark: [
    "rgba(0, 0, 0, 0.4)",
    "rgba(250, 204, 21, 0.25)",
    "rgba(250, 204, 21, 0.50)",
    "rgba(250, 204, 21, 0.75)",
    "rgba(250, 204, 21, 1)",
  ],
};

const getSeasonDateRange = (year: string, season: string) => {
  return SEASON_DATE_RANGES[year]?.[season] ?? undefined;
};

const getLevel = (count: number, max: number) => {
  if (count === 0) return 0;
  if (count === max) return 4;
  if (count <= max / 3) return 1;
  if (count <= 2 * (max / 3)) return 2;
  if (count < max) return 3;

  return 0;
};

const getInitialRacesPerDate = (seasonDateRange?: {
  start: string;
  end: string;
}) => {
  if (!seasonDateRange) return {};

  return {
    [seasonDateRange.start]: 0,
    [seasonDateRange.end]: 0,
  };
};

export const ActivityHeatMap = ({
  raceResults,
  season,
  year,
}: ActivityHeatMapProps) => {
  const { resolvedTheme } = useTheme();

  const seasonDateRange = useMemo(
    () => getSeasonDateRange(year, season),
    [season, year]
  );

  const data = useMemo(() => {
    const racesPerDate = raceResults.reduce((acc, result) => {
      const date = result.startTime.split("T")[0];

      return {
        ...acc,
        [date]: (acc[date] ?? 0) + 1,
      };
    }, getInitialRacesPerDate(seasonDateRange));

    const max = Math.max(...(Object.values(racesPerDate) as number[]));

    return Object.entries(racesPerDate)
      .map(([date, count]) => ({
        date,
        count,
        level: getLevel(count as number, max),
      }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ) as Activity[];
  }, [raceResults, seasonDateRange]);

  if (!seasonDateRange) {
    return null;
  }

  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-base font-normal tracking-tight">Activity</p>
      <ActivityCalendar
        blockSize={14}
        colorScheme={resolvedTheme as "light" | "dark"}
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
