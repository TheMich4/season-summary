"use client";

import { ActivityHeatMap } from "./activity-heat-map";
import { MostRacedWeek } from "./most-raced-week";
import { Calendar } from "lucide-react";
import { AnimatedChartWrapper } from "../animated/animated-chart-wrapper";

interface RacingActivityProps {
  activity: Record<string, number>;
  racesPerWeek: Record<string, number>;
  season: string;
  year: string;
  delay?: number;
}

export const RacingActivity = ({
  activity,
  racesPerWeek,
  season,
  year,
  delay = 0,
}: RacingActivityProps) => {
  // Calculate total races and max activity
  const totalRaces = Object.values(activity).reduce((a, b) => a + b, 0);
  const max = Math.max(...Object.values(activity));
  const maxDate = new Date(
    Object.entries(activity).sort((a, b) => b[1] - a[1])[0]?.[0] ?? new Date()
  );

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
      <div className="grid gap-1">
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
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-primary/10 bg-background/50 p-2">
            <ActivityHeatMap
              activity={activity}
              season={season}
              year={year}
            />
          </div>
          <div className="rounded-lg border border-primary/10 bg-background/50 p-2">
            <MostRacedWeek racesPerWeek={racesPerWeek} />
          </div>
        </div>
      </div>
    </AnimatedChartWrapper>
  );
}; 