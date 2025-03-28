"use client";

import type { Category } from "@season-summary/config";
import { Loader2 } from "lucide-react";
import { EnhancedRatingChart } from "../animated/enhanced-rating-chart";
import { EnhancedFinishPositions } from "../animated/enhanced-finish-positions";
import { EnhancedRaceList } from "../animated/enhanced-race-list";
import { StatBox } from "@/components/stat-box";
import { AssetStats } from "./asset-stats";
import { QualifyingStats } from "./qualifying-stats";
import { RaceStats } from "./race-stats";
import { IncidentsGraph } from "./incidents-graph";
import { SOF } from "./sof";
import { Points } from "./points";
import { RacingActivity } from "./racing-activity";
import { AnimatedSection } from "../animated/animated-section";
import { DevStatsToggle } from "../dev-stats-toggle";

interface EnhancedViewProps {
  category: Category;
  data: any;
  season: string;
  simpleData: any;
  year: string;
  isDone?: boolean;
}

export const EnhancedView = ({
  data,
  simpleData,
  season,
  year,
  category,
  isDone = true,
}: EnhancedViewProps) => {
  console.log({ data });
  if (!data) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  // Environment check for dev mode
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Rating charts row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <EnhancedRatingChart
          dataPoints={data.iratingPoints}
          label="iRating"
          description="How your iRating developed over the season."
          tooltipLabel="IRATING"
          delay={0.1}
        />
        <EnhancedRatingChart
          dataPoints={data.safetyRatingPoints}
          label="Safety Rating"
          description="How your safety rating developed over the season."
          deltaPrecision={2}
          tooltipLabel="SR"
          delay={0.2}
        />
      </div>

      {/* Key stats at a glance */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <AnimatedSection delay={0.3}>
          <StatBox
            label="Races"
            value={data.stats.races}
            useCounter={!isDone}
            className="bg-background/70 backdrop-blur-md"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <StatBox
            label="Wins"
            value={data.stats.wins}
            useCounter={!isDone}
            className="bg-background/70 backdrop-blur-md"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <StatBox
            label="Top 5"
            value={data.stats.top5}
            useCounter={!isDone}
            className="bg-background/70 backdrop-blur-md"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <StatBox
            label="Laps"
            value={data.stats.laps}
            useCounter={!isDone}
            className="bg-background/70 backdrop-blur-md"
          />
        </AnimatedSection>
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
              <AnimatedSection delay={0.7}>
                <SOF sof={data.sof} useCounter={!isDone} />
              </AnimatedSection>
              <AnimatedSection delay={0.8}>
                <Points points={data.points} />
              </AnimatedSection>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AnimatedSection delay={0.9}>
                <QualifyingStats qualiData={data.quali} />
              </AnimatedSection>
              <AnimatedSection delay={1.0}>
                <RaceStats raceData={data.race} />
              </AnimatedSection>
            </div>

            <AnimatedSection delay={1.1}>
              <AssetStats
                name="series"
                assetData={data.seriesData}
                preposition="in"
              />
            </AnimatedSection>
            <AnimatedSection delay={1.2}>
              <AssetStats
                name="cars"
                assetData={data.carData}
                preposition="in"
              />
            </AnimatedSection>
            <AnimatedSection delay={1.3}>
              <AssetStats
                name="tracks"
                assetData={data.trackData}
                preposition="at"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Race list */}
      <AnimatedSection delay={1.4}>
        <EnhancedRaceList
          seasonResults={simpleData.seasonResults}
          category={category}
        />
      </AnimatedSection>
      
      {/* Dev Mode Stats Toggle */}
      <DevStatsToggle data={data} isDev={isDev} />
    </div>
  );
};

