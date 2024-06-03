/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ActivityHeatMap } from "./activity-heat-map";
import { AssetStats } from "./asset-stats";
import type { Category } from "@season-summary/config";
import { FinishPositions } from "./finish-positions";
import { Header } from "./header";
import { Incidents } from "./incidents";
import { IncidentsGraph } from "./incidents-graph";
import { Loader2 } from "lucide-react";
import { MostRacedWeek } from "./most-raced-week";
import { Points } from "./points";
import { QualifyingStats } from "./qualifying-stats";
import { RaceList } from "../race-list";
import { RaceStats } from "./race-stats";
import { RatingChart } from "./rating-chart";
import { SOF } from "./sof";
import { StatBox } from "@/components/stat-box";
import { Finishes } from "./finishes";

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <div className="lg:col-span-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <ActivityHeatMap
                activity={data.activity}
                season={season}
                year={year}
              />
              <MostRacedWeek racesPerWeek={data.racesPerWeek} />
              <FinishPositions finishPositions={data.finishPositions} />
              <IncidentsGraph dataPoints={data.incidents.incidentPoints} />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col">
              <Incidents incidentData={data.incidents} useCounter={!isDone} />
              <SOF sofData={data.sof} useCounter={!isDone} />
              <Points pointsData={data.points} useCounter={!isDone} />
              <Finishes finishes={data.reasonOut} useCounter={!isDone} />
            </div>
          </div>
        </div>
        <div className="grid lg:col-span-5 lg:grid-cols-2">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:flex-row">
              <StatBox
                label="Races"
                value={data.stats.races}
                useCounter={!isDone}
              />
              <StatBox
                label="Wins"
                value={data.stats.wins}
                useCounter={!isDone}
              />
              <StatBox
                label="Top 5"
                value={data.stats.top5}
                useCounter={!isDone}
              />
              <StatBox
                label="Laps"
                value={data.stats.laps}
                useCounter={!isDone}
              />
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
            <div className="grid grid-cols-2 gap-4">
              <QualifyingStats qualiData={data.quali} />
              <RaceStats raceData={data.race} />
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
