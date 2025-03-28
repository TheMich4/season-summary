"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type TrackPerformance } from "./utils";
import { AnimatedSection } from "../animated/animated-section";
import { Trophy } from "lucide-react";

interface TrackPerformanceProps {
  tracks: TrackPerformance[];
}

export function TrackPerformance({ tracks }: TrackPerformanceProps) {
  return (
    <AnimatedSection delay={0.4}>
      <Card className="w-full bg-background/70 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Best Performing Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          {tracks.length > 0 ? (
            <div className="space-y-3">
              {tracks.map((track, index) => (
                <div key={track.name} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium">
                        {track.name}
                        {track.wins > 0 && (
                          <span className="ml-2 inline-flex">
                            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                          </span>
                        )}
                      </p>
                      <p className="ml-2 text-xs text-muted-foreground">
                        {track.races} {track.races === 1 ? 'race' : 'races'}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Avg: P{track.averageFinish.toFixed(1)}</span>
                      <span>•</span>
                      <span>Best: P{track.bestFinish}</span>
                      <span>•</span>
                      <span>
                        {track.podiums} {track.podiums === 1 ? 'podium' : 'podiums'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              No track data available
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  );
} 