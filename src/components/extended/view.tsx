"use client";

import { CarStats } from "./car-stats";
import { CategoryDropdown } from "../profile/category-dropdown";
import { FinishPositions } from "./finish-positions";
import { FullIratingChart } from "./full-irating-chart";
import { FullSafetyRatingChart } from "./full-safety-rating-chart";
import { Incidents } from "./incidents";
import { IncidentsGraph } from "./incidents-graph";
import { MostRacedWeek } from "./most-raced-week";
import { Points } from "./points";
import { QualifyingStats } from "./qualifying-stats";
import { RaceList } from "../profile/race-list";
import { RaceStats } from "./race-stats";
import { SOF } from "./sof";
import { SeasonSwitch } from "../profile/season-switch";
import { SeriesStats } from "./series-stats";
import { SimpleStat } from "./simple-stat";
import { TrackStats } from "./track-stats";

export const View = ({
  data,
  iracingId,
  simpleData,
  season,
  year,
  category,
}) => {
  // console.log({
  //   data,
  //   simpleData,
  // });

  if (!data) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-2 grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        <div className="order-3 flex flex-col items-baseline gap-1 justify-self-center text-ellipsis sm:flex-row sm:gap-2 md:order-1 md:justify-self-start">
          <p className="text-ellipsis text-3xl font-extrabold leading-tight tracking-tighter">
            {simpleData.memberData?.displayName ?? ""}
          </p>
          <p className="flex items-center justify-center self-center text-sm text-foreground/80 dark:text-primary sm:self-auto">
            ({simpleData.memberData?.clubName ?? ""})
          </p>
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
        <FullIratingChart dataPoints={data.iratingPoints} />
        <FullSafetyRatingChart dataPoints={data.safetyRatingPoints} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
        <div className="lg:col-span-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <MostRacedWeek racesPerWeek={data.racesPerWeek} />
              <FinishPositions finishPositions={data.finishPositions} />
              <IncidentsGraph dataPoints={data.incidents.incidentPoints} />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col">
              <Incidents incidentData={data.incidents} />
              <SOF sofData={data.sof} />
              <Points pointsData={data.points} />
            </div>
          </div>
        </div>
        <div className="grid lg:col-span-5 lg:grid-cols-2">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:flex-row">
              <SimpleStat
                label="Races"
                value={data.stats.races}
                // previous={simpleData.previousSeasonStats.starts}
              />
              <SimpleStat
                label="Wins"
                value={data.stats.wins}
                // previous={simpleData.previousSeasonStats.wins}
              />
              <SimpleStat
                label="Top 5"
                value={data.stats.top5}
                // previous={simpleData.previousSeasonStats.top5}
              />
              <SimpleStat
                label="Laps"
                value={data.stats.laps}
                // previous={simpleData.previousSeasonStats.laps}
              />
            </div>
            <SeriesStats racesPerSeries={data.racesPerSeries} />
            <CarStats racesPerCar={data.racesPerCar} />
            <TrackStats racesPerTrack={data.racesPerTrack} />
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
