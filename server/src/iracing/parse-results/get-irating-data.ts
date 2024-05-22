import { getIratingPoints } from "./get-irating-points";

export const getIRatingData = (currentIRatingData: any, raceResult: any) => {
  return {
    start: currentIRatingData.start ?? raceResult.oldiRating,
    end: raceResult.newiRating,
    points: getIratingPoints(currentIRatingData.points, raceResult),
  };
};
