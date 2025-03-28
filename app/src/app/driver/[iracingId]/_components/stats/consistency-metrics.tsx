"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type IncidentStats } from "./utils";
import { AnimatedSection } from "../animated/animated-section";

interface ConsistencyMetricsProps {
  stats: IncidentStats;
  reasonOut: Record<string, number>;
  totalLaps: number;
}

export function ConsistencyMetrics({ stats, reasonOut, totalLaps }: ConsistencyMetricsProps) {
  // Calculate completion percentage (running = completed)
  const completedRaces = reasonOut.Running || 0;
  const totalRaces = Object.values(reasonOut).reduce((sum, count) => sum + count, 0);
  const completionRate = totalRaces > 0 ? (completedRaces / totalRaces) * 100 : 0;
  
  return (
    <AnimatedSection delay={0.5}>
      <Card className="w-full bg-background/70 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Racing Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Incident Metrics</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Incidents Per Race</span>
                  <span className="font-medium">{stats.incidentsPerRace.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Incidents Per Lap</span>
                  <span className="font-medium">{stats.incidentsPerLap.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Incidents</span>
                  <span className="font-medium">{stats.totalIncidents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Laps</span>
                  <span className="font-medium">{totalLaps}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 text-sm font-medium">Race Completion</h4>
              <div className="mb-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="text-sm font-medium">{completionRate.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Results Breakdown</h4>
                <div className="grid gap-2">
                  {Object.entries(reasonOut).map(([reason, count]) => (
                    <div key={reason} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{reason}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
} 