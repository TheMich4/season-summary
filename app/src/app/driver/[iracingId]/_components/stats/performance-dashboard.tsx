"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type PerformanceStats } from "./utils";
import { AnimatedSection } from "../animated/animated-section";

interface PerformanceDashboardProps {
  stats: PerformanceStats;
}

export function PerformanceDashboard({ stats }: PerformanceDashboardProps) {
  const winRate = (stats.wins / stats.races) * 100;
  const podiumRate = (stats.podiums / stats.races) * 100;
  const top5Rate = (stats.top5 / stats.races) * 100;
  
  return (
    <AnimatedSection delay={0.2}>
      <Card className="w-full bg-background/70 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Season Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Win Rate</span>
                <span className="text-sm font-medium">{winRate.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${Math.min(winRate * 2, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{stats.wins} of {stats.races} races</div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Podium Rate</span>
                <span className="text-sm font-medium">{podiumRate.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${Math.min(podiumRate, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{stats.podiums} of {stats.races} races</div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Top 5 Rate</span>
                <span className="text-sm font-medium">{top5Rate.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${Math.min(top5Rate, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{stats.top5} of {stats.races} races</div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">iRating Change</span>
                <span className={`text-sm font-medium ${stats.iRatingChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.iRatingChange >= 0 ? '+' : ''}{stats.iRatingChange}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all ${stats.iRatingChange >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(stats.iRatingChange) / 500 * 50 + 50, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">Average finish: {stats.averageFinish.toFixed(1)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
} 