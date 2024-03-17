export const getPointData = (currentPoints: any, raceResult: any) => {
  const { champPoints } = raceResult;

  if (champPoints === -1) {
    return currentPoints;
  }

  return {
    average:
      (currentPoints.average * currentPoints.races + champPoints) /
      (currentPoints.races + 1),
    highest: Math.max(currentPoints.highest, champPoints),
    lowest: currentPoints.lowest
      ? Math.min(currentPoints.lowest, champPoints)
      : champPoints,
    races: currentPoints.races + 1,
  };
};
