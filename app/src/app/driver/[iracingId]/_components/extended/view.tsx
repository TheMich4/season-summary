"use client";

import { AssetStats } from "./asset-stats";
import type { Category } from "@season-summary/config";
import { FinishPositions } from "./finish-positions";
import { Header } from "./header";
import { IncidentsGraph } from "./incidents-graph";
import { Loader2 } from "lucide-react";
import { Points } from "./points";
import { QualifyingStats } from "./qualifying-stats";
import { RaceList } from "../race-list";
import { RaceStats } from "./race-stats";
import { RatingChart } from "./rating-chart";
import { SOF } from "./sof";
import { RacingActivity } from "./racing-activity";

interface ViewProps {
  category: Category;
  data: any;
  iracingId: string;
  season: string;
  simpleData: any;
  year: string;
  isDone?: boolean;
}

export const View = ({
  data,
  iracingId,
  simpleData,
  season,
  year,
  category,
  isDone = true,
}: ViewProps) => {
  if (!data) {
    return <Loader2 className="size-8 animate-spin dark:text-primary" />;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Header
        displayName={simpleData?.memberData?.displayName ?? ""}
        iracingId={iracingId}
        season={+season}
        year={+year}
        category={category}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RatingChart
          dataPoints={data.iratingPoints}
          label="iRating"
          description="How your iRating developed over the season."
          tooltipLabel="IRATING"
          useCounter={!isDone}
        />
        <RatingChart
          dataPoints={data.safetyRatingPoints}
          label="Safety Rating"
          description="How your safety rating developed over the season."
          deltaPrecision={2}
          tooltipLabel="SR"
          useCounter={!isDone}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            <RacingActivity
              activity={data.activity}
              racesPerWeek={data.racesPerWeek}
              season={season}
              year={year}
            />
            <FinishPositions finishPositions={data.finishPositions} />
            <IncidentsGraph
              dataPoints={data.incidents.incidentPoints}
              incidentsPerLap={data.incidents.incidentsPerLap.value}
              incidentsPerRace={data.incidents.incidentsPerRace.value}
              incidentsPerCorner={data.incidents.incidentsPerCorner.value}
            />
          </div>
        </div>
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
            <div className="grid gap-4 md:grid-cols-2">
              <AssetStats
                name="cars"
                assetData={data.carData}
                preposition="in"
              />
              <AssetStats
                name="tracks"
                assetData={data.trackData}
                preposition="at"
              />
            </div>
          </div>
        </div>
      </div>

      <RaceList
        seasonResults={simpleData.seasonResults}
        iracingId={iracingId}
        category={category}
      />
    </div>
  );
};
