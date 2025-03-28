"use client";

import { SEASON_DATE_RANGES } from "@/config/iracing";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import ActivityCalendar, {
  type ThemeInput,
  type Activity,
  type BlockElement,
} from "react-activity-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";

interface ActivityHeatMapProps {
  activity: Record<string, number>;
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

const ActivityTooltip = ({ count, date }: Activity) => {
  return (
    <TooltipContent className="rounded-md border bg-background/80 p-2 backdrop-blur">
      <span className="font-bold">{count}</span>
      <span className="text-sm">
        {" races on "}
        {new Date(date).toLocaleDateString()}
      </span>
    </TooltipContent>
  );
};

export const ActivityHeatMap = ({
  activity,
  season,
  year,
}: ActivityHeatMapProps) => {
  const { resolvedTheme } = useTheme();

  const seasonDateRange = useMemo(
    () => getSeasonDateRange(year, season),
    [season, year],
  );

  const { data, max, maxDate } = useMemo(() => {
    const racesPerDate: Record<string, number> = {
      ...getInitialRacesPerDate(seasonDateRange),
      ...activity,
    };

    // @ts-ignore
    const { maxDate, max } = Object.entries(racesPerDate).reduce(
      // @ts-ignore
      (acc, [date, count]) => {
        const { maxDate, max } = acc;

        if (!maxDate || count > max) {
          return {
            maxDate: date,
            max: count,
          };
        }

        return acc;
      },
      { maxDate: null, max: 0 },
    );

    return {
      data: Object.entries(racesPerDate ?? {})
        .map(([date, count]) => ({
          date,
          count,
          level: getLevel(count as number, max),
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ) as Activity[],
      max,
      maxDate: new Date(maxDate),
    };
  }, [activity, seasonDateRange]);

  const renderBlock = useCallback((block: BlockElement, activity: Activity) => {
    return (
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>{block}</TooltipTrigger>
          <TooltipPortal>
            <ActivityTooltip {...activity} />
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    );
  }, []);

  if (!seasonDateRange || !activity || Object.values(activity).length === 0) {
    return null;
  }

  return (
      <ActivityCalendar
        blockMargin={4}
        blockSize={18}
        colorScheme={resolvedTheme as "light" | "dark"}
        data={data}
        theme={THEME}
        weekStart={2}
        hideColorLegend
        hideMonthLabels
        hideTotalCount
        renderBlock={renderBlock}
      />
  );
};
