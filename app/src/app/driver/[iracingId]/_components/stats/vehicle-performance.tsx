"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type VehiclePerformance } from "./utils";
import { AnimatedSection } from "../animated/animated-section";
import { Sparkles } from "lucide-react";

interface VehiclePerformanceProps {
  vehicles: VehiclePerformance[];
}

export function VehiclePerformance({ vehicles }: VehiclePerformanceProps) {
  // Only show vehicles with at least 2 races to get meaningful data
  const filteredVehicles = vehicles.filter(v => v.races >= 2).slice(0, 5);
  
  return (
    <AnimatedSection delay={0.3}>
      <Card className="w-full bg-background/70 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Vehicle Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <div key={vehicle.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{vehicle.name}</span>
                      {index === 0 && <Sparkles className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {vehicle.races} {vehicle.races === 1 ? 'race' : 'races'}
                    </span>
                  </div>
                  <div className="grid gap-2 text-xs md:grid-cols-4">
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-muted-foreground">Avg. Finish</div>
                      <div className="text-sm font-semibold">{vehicle.averageFinish.toFixed(1)}</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-muted-foreground">Best Finish</div>
                      <div className="text-sm font-semibold">P{vehicle.bestFinish}</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-muted-foreground">Podiums</div>
                      <div className="text-sm font-semibold">{vehicle.podiums}</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-muted-foreground">iRating Gain</div>
                      <div className={`text-sm font-semibold ${vehicle.iRatingDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {vehicle.iRatingDiff >= 0 ? '+' : ''}{vehicle.iRatingDiff}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Not enough vehicle data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
} 