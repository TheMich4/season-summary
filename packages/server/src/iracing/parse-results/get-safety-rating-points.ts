export const getSafetyRatingPoints = (
  currentSafetyRatingPoints: Array<number>,
  result: any
) => {
  const { newSubLevel, oldSubLevel } = result;

  if (newSubLevel === -1) {
    return currentSafetyRatingPoints;
  }

  if (currentSafetyRatingPoints.length === 0 && oldSubLevel !== -1) {
    return [oldSubLevel / 100, newSubLevel / 100];
  }

  return [...currentSafetyRatingPoints, newSubLevel / 100];
};
