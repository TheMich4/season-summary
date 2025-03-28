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
import { AnimatedChartWrapper } from "./animated-chart-wrapper";
import { Calendar } from "lucide-react";

interface EnhancedActivityHeatMapProps {
  activity: Record<string, number>;
  season: string;
  year: string;
  delay?: number;
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
    <TooltipContent className="rounded-md border bg-background/95 p-2 backdrop-blur-lg shadow-md">
      <div className="flex flex-col">
        <span className="text-lg font-bold text-primary">{count}</span>
        <span className="text-xs">
          {count === 1 ? "race" : "races"} on {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </TooltipContent>
  );
};

export const EnhancedActivityHeatMap = ({
  activity,
  season,
  year,
  delay = 0,
}: EnhancedActivityHeatMapProps) => {
  const { resolvedTheme } = useTheme();

  const seasonDateRange = useMemo(
    () => getSeasonDateRange(year, season),
    [season, year],
  );

  const { data, max, maxDate, totalRaces } = useMemo(() => {
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
    
    // Calculate total races
    const totalRaces = Object.values(racesPerDate).reduce(
      (sum, count) => sum + (count as number), 
      0
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
      totalRaces,
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

  // Format date for better readability
  const formattedDate = maxDate.toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <AnimatedChartWrapper
      title="Racing Activity"
      value={formattedDate}
      description={`${max} races on your busiest day`}
      icon={<Calendar className="h-5 w-5" />}
      delay={delay}
    >
      <div className="mb-3 mt-1 flex items-center justify-between rounded-lg border border-primary/10 bg-background/50 p-2 text-center text-xs">
        <div>
          <div className="text-muted-foreground">Total Races</div>
          <div className="font-medium">{totalRaces}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Days Raced</div>
          <div className="font-medium">{Object.keys(activity).length}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Avg Races/Day</div>
          <div className="font-medium">
            {(totalRaces / Math.max(1, Object.keys(activity).length)).toFixed(1)}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-primary/10 bg-background/50 p-2 pb-0">
        <ActivityCalendar
          blockMargin={4}
          blockSize={16}
          colorScheme={resolvedTheme as "light" | "dark"}
          data={data}
          theme={THEME}
          weekStart={1}
          hideColorLegend
          hideMonthLabels
          hideTotalCount
          renderBlock={renderBlock}
          labels={{
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            totalCount: '{{count}} contributions in {{year}}',
            legend: {
              less: 'Less',
              more: 'More'
            },
          }}
        />
      </div>
    </AnimatedChartWrapper>
  );
}; 