"use client";

import type { Category } from "@season-summary/config";
import { Loader2 } from "lucide-react";
import { EnhancedRatingChart } from "../animated/enhanced-rating-chart";
import { EnhancedActivityHeatMap } from "../animated/enhanced-activity-heatmap";
import { EnhancedFinishPositions } from "../animated/enhanced-finish-positions";
import { EnhancedRaceList } from "../animated/enhanced-race-list";
import { StatBox } from "@/components/stat-box";
import { AssetStats } from "./asset-stats";
import { QualifyingStats } from "./qualifying-stats";
import { RaceStats } from "./race-stats";
import { IncidentsGraph } from "./incidents-graph";
import { MostRacedWeek } from "./most-raced-week";
import { Incidents } from "./incidents";
import { SOF } from "./sof";
import { Points } from "./points";
import { Finishes } from "./finishes";
import { RacingActivity } from "./racing-activity";

interface EnhancedViewProps {
  category: Category;
  data: any;
  iracingId: string;
  season: string;
  simpleData: any;
  year: string;
  isDone?: boolean;
}

export const EnhancedView = ({
  data,
  iracingId,
  simpleData,
  season,
  year,
  category,
  isDone = true,
}: EnhancedViewProps) => {
  console.log({data})
  if (!data) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Rating charts row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <EnhancedRatingChart
          dataPoints={data.iratingPoints}
          label="iRating"
          description="How your iRating developed over the season."
          tooltipLabel="IRATING"
          useCounter={!isDone}
          delay={0.1}
        />
        <EnhancedRatingChart
          dataPoints={data.safetyRatingPoints}
          label="Safety Rating"
          description="How your safety rating developed over the season."
          deltaPrecision={2}
          tooltipLabel="SR"
          useCounter={!isDone}
          delay={0.2}
        />
      </div>
      
      {/* Key stats at a glance */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatBox
          label="Races"
          value={data.stats.races}
          useCounter={!isDone}
          className="bg-background/70 backdrop-blur-md"
        />
        <StatBox
          label="Wins"
          value={data.stats.wins}
          useCounter={!isDone}
          className="bg-background/70 backdrop-blur-md"
        />
        <StatBox
          label="Top 5"
          value={data.stats.top5}
          useCounter={!isDone}
          className="bg-background/70 backdrop-blur-md"
        />
        <StatBox
          label="Laps"
          value={data.stats.laps}
          useCounter={!isDone}
          className="bg-background/70 backdrop-blur-md"
        />
      </div>

      {/* Main stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {/* Left column - Activity & Positions */}
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            <RacingActivity 
              activity={data.activity}
              racesPerWeek={data.racesPerWeek}
              season={season}
              year={year}
              delay={0.3}
            />
            <EnhancedFinishPositions 
              finishPositions={data.finishPositions}
              delay={0.4}
            />
            <IncidentsGraph 
              dataPoints={data.incidents.incidentPoints}
              incidentsPerLap={data.incidents.incidentsPerLap.value}
              incidentsPerRace={data.incidents.incidentsPerRace.value}
              incidentsPerCorner={data.incidents.incidentsPerCorner.value}
            />
          </div>
        </div>
        
        {/* Right column - Series & Assets */}
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <SOF sof={data.sof} useCounter={!isDone} />
              <Points points={data.points} useCounter={!isDone} />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <QualifyingStats qualiData={data.quali} />
              <RaceStats raceData={data.race} />
            </div>
            
            <AssetStats
              name="series"
              assetData={data.seriesData}
              preposition="in"
            />
              <AssetStats name="cars" assetData={data.carData} preposition="in" />
              <AssetStats
                name="tracks"
                assetData={data.trackData}
                preposition="at"
              />
          </div>
        </div>
      </div>

      {/* Race list */}
      <EnhancedRaceList
        seasonResults={simpleData.seasonResults}
        iracingId={iracingId}
        category={category}
      />
    </div>
  );
}; 