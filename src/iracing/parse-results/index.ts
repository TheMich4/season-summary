import { getDriverResult } from "./get-driver-results.js";
import { getFinishPositions } from "./get-finish-positions.js";
import { getIncidentsData } from "./get-incidents-data.js";
import { getInitialState } from "./get-initial-state.js";
import { getIratingPoints } from "./get-irating-points.js";
import { getPointData } from "./get-point-data.js";
import { getQualiData } from "./get-quali-data.js";
import { getRaceData } from "./get-race-data.js";
import { getRacesPerCar } from "./get-races-per-car.js";
import { getRacesPerSeries } from "./get-races-per-series.js";
import { getRacesPerTrack } from "./get-races-per-track.js";
import { getRacesPerWeek } from "./get-races-per-week.js";
import { getSOFData } from "./get-sof-data.js";
import { getSafetyRatingPoints } from "./get-safety-rating-points.js";
import { getStats } from "./get-stats.js";
import { getCarData } from "./get-car-data.js";
import { getTrackData } from "./get-track-data.js";
import { getSeriesData } from "./get-series-data.js";
import { getIRatingData } from "./get-irating-data.js";
import { getSafetyRatingData } from "./get-safety-rating-data.js";

export const parseResults = (
  // TODO: add type
  results: Array<any>,
  iracingId: string,
  // TODO: add type
  initialData: any = undefined
) => {
  return results?.reduce((acc, result) => {
    const raceResult = getDriverResult(result, iracingId);

    if (!raceResult) {
      return acc;
    }

    return {
      finalIRating: raceResult.newiRating,

      carData: getCarData(acc.carData, raceResult),
      finishPositions: getFinishPositions(acc.finishPositions, raceResult),
      incidents: getIncidentsData(acc.incidents, raceResult, result),
      iRatingData: getIRatingData(acc.iRatingData, raceResult),
      safetyRatingData: getSafetyRatingData(acc.safetyRatingData, raceResult),
      points: getPointData(acc.points, raceResult),
      quali: getQualiData(acc.quali, raceResult),
      race: getRaceData(acc.race, raceResult),
      racesPerWeek: getRacesPerWeek(acc.racesPerWeek, result),
      seriesData: getSeriesData(acc.seriesData, raceResult, result),
      sof: getSOFData(acc.sof, raceResult, result),
      stats: getStats(acc.stats, raceResult),
      trackData: getTrackData(acc.trackData, raceResult, result),

      // To remove
      safetyRatingPoints: getSafetyRatingPoints(
        acc.safetyRatingPoints,
        raceResult
      ),
      iratingPoints: getIratingPoints(acc.iratingPoints, raceResult),
      racesPerCar: getRacesPerCar(acc.racesPerCar, raceResult),
      racesPerSeries: getRacesPerSeries(acc.racesPerSeries, result),
      racesPerTrack: getRacesPerTrack(acc.racesPerTrack, result),
    };
  }, initialData ?? getInitialState());
};
