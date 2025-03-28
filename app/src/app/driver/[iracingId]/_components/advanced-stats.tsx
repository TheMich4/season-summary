"use client";

import { useState, useEffect } from "react";
import { PerformanceDashboard } from "./stats/performance-dashboard";
import { VehiclePerformance } from "./stats/vehicle-performance";
import { TrackPerformance } from "./stats/track-performance";
import { ConsistencyMetrics } from "./stats/consistency-metrics";
import { QualifyingPerformanceAnalysis } from "./stats/qualifying-performance";
import { 
  calculatePerformanceStats,
  calculateBestTracks,
  calculateVehiclePerformance,
  calculateIncidentStats,
  calculateQualifyingPerformance,
  type PerformanceStats,
  type TrackPerformance as TrackPerformanceType,
  type VehiclePerformance as VehiclePerformanceType,
  type IncidentStats,
  type QualifyingPerformance
} from "./stats/utils";
import { AnimatedSection } from "./animated/animated-section";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface AdvancedStatsProps {
  data: any;
  onClose: () => void;
}

export function AdvancedStats({ data, onClose }: AdvancedStatsProps) {
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats | null>(null);
  const [bestTracks, setBestTracks] = useState<TrackPerformanceType[]>([]);
  const [vehiclePerformance, setVehiclePerformance] = useState<VehiclePerformanceType[]>([]);
  const [incidentStats, setIncidentStats] = useState<IncidentStats | null>(null);
  const [qualifyingStats, setQualifyingStats] = useState<QualifyingPerformance | null>(null);
  
  useEffect(() => {
    if (data) {
      setPerformanceStats(calculatePerformanceStats(data));
      setBestTracks(calculateBestTracks(data.trackData));
      setVehiclePerformance(calculateVehiclePerformance(data.carData));
      setIncidentStats(calculateIncidentStats(data.incidents));
      setQualifyingStats(calculateQualifyingPerformance(data.quali, data.race));
    }
  }, [data]);
  
  if (!data || !performanceStats) {
    return <div className="min-h-[400px]">Loading advanced statistics...</div>;
  }
  
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="mr-2"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-xl font-bold">Advanced Statistics</h2>
      </div>
      
      <div className="grid gap-4">
        {/* Performance Overview */}
        {performanceStats && (
          <PerformanceDashboard stats={performanceStats} />
        )}
        
        {/* Qualifying Performance Analysis */}
        {qualifyingStats && (
          <QualifyingPerformanceAnalysis stats={qualifyingStats} />
        )}
        
        {/* Two-column layout for mid-size components */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Vehicle Performance */}
          {vehiclePerformance.length > 0 && (
            <VehiclePerformance vehicles={vehiclePerformance} />
          )}
          
          {/* Track Performance */}
          {bestTracks.length > 0 && (
            <TrackPerformance tracks={bestTracks} />  
          )}
        </div>
        
        {/* Consistency Metrics */}
        {incidentStats && (
          <ConsistencyMetrics 
            stats={incidentStats} 
            reasonOut={data.reasonOut}
            totalLaps={data.stats.laps}
          />
        )}
        
        {/* Additional information */}
        <AnimatedSection delay={0.6} className="text-center text-sm text-muted-foreground">
          <p>This page shows advanced statistics based on your season data.</p>
        </AnimatedSection>
      </div>
    </div>
  );
} 