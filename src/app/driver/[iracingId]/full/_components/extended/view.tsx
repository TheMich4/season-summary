"use client";

import { Category } from "@/config/category";
import { FinishPositions } from "./finish-positions";
import { Incidents } from "./incidents";
import { IncidentsGraph } from "./incidents-graph";
import { MostRacedWeek } from "./most-raced-week";
import { Points } from "./points";
import { QualifyingStats } from "./qualifying-stats";
import { RaceStats } from "./race-stats";
import { SOF } from "./sof";
import { ActivityHeatMap } from "./activity-heat-map";
import { SeasonSwitch } from "../../../_components/profile/season-switch";
import { CategoryDropdown } from "../../../_components/profile/category-dropdown";
import { RaceList } from "../../../_components/profile/race-list";
import { StatBox } from "@/components/stat-box";
import { RatingChart } from "./rating-chart";
import { AssetStats } from "./asset-stats";
import { Loader2 } from "lucide-react";

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
      <div className="mb-2 grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        <div className="order-3 flex flex-col items-baseline gap-1 justify-self-center text-ellipsis sm:flex-row sm:gap-2 md:order-1 md:justify-self-start">
          <p className="text-ellipsis text-3xl font-extrabold leading-tight tracking-tighter">
            {simpleData.memberData?.displayName ?? ""}
          </p>
          {/* <p className="flex items-center justify-center self-center text-sm text-foreground/80 dark:text-primary sm:self-auto">
            ({simpleData.memberData?.clubName ?? ""})
          </p> */}
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <SeasonSwitch
            iracingId={iracingId}
            season={parseInt(season, 10)}
            year={parseInt(year, 10)}
            category={category}
          />
        </div>

        <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
          <CategoryDropdown />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RatingChart
          dataPoints={data.iratingPoints}
          label="iRating"
          description="How your iRating developed over the season."
          tooltipLabel="IRATING"
        />
        <RatingChart
          dataPoints={data.safetyRatingPoints}
          label="Safety Rating"
          description="How your safety rating developed over the season."
          deltaPrecision={2}
          tooltipLabel="SR"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <div className="lg:col-span-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <ActivityHeatMap
                raceResults={simpleData.seasonResults}
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
