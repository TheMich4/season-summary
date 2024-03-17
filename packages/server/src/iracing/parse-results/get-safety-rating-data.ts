import { getSafetyRatingPoints } from "./get-safety-rating-points";

export const getSafetyRatingData = (
  currentSafetyRatingData: any,
  raceResult: any
) => {
  return {
    start: currentSafetyRatingData.start ?? raceResult.oldSubLevel / 100,
    end: raceResult.newSubLevel / 100,
    points: getSafetyRatingPoints(currentSafetyRatingData.points, raceResult),
  };
};
