"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type QualifyingPerformance } from "./utils";
import { AnimatedSection } from "../animated/animated-section";
import { Flag } from "lucide-react";

interface QualifyingPerformanceProps {
  stats: QualifyingPerformance;
}

export function QualifyingPerformanceAnalysis({ stats }: QualifyingPerformanceProps) {
  // Calculate pole rate
  const poleRate = (stats.poles / stats.races) * 100;
  const frontRowRate = (stats.frontRowStarts / stats.races) * 100;
  
  return (
    <AnimatedSection delay={0.3}>
      <Card className="w-full bg-background/70 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" />
            Qualifying Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Pole Positions</span>
                  <span className="text-sm font-medium">{stats.poles}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min(poleRate * 3, 100)}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {poleRate.toFixed(1)}% of races
                </div>
              </div>
              
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Front Row Starts</span>
                  <span className="text-sm font-medium">{stats.frontRowStarts}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${Math.min(frontRowRate * 1.5, 100)}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {frontRowRate.toFixed(1)}% of races
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">Best Position</div>
                  <div className="text-sm font-semibold">P{stats.bestPosition}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">Worst Position</div>
                  <div className="text-sm font-semibold">P{stats.worstPosition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">Average Position</div>
                  <div className="text-sm font-semibold">P{stats.averagePosition.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-muted-foreground">Race Improvement</div>
                  <div className="text-sm font-semibold text-green-500">+{stats.avgImprovement.toFixed(1)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
} 