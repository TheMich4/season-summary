export const getSeriesData = (
  currentSeriesData: any,
  raceResult: any,
  result: any
) => {
  const { seriesName } = result;

  const seriesData = currentSeriesData[seriesName] ?? {
    races: 0,
    wins: 0,
    podiums: 0,
    average: 0,
    best: 999,
    worst: 0,
    bestGain: 0,
    lapsLead: 0,
    lapsCompleted: 0,
    iRatingDiff: 0,
    incidents: 0,
  };

  return {
    ...currentSeriesData,
    [seriesName]: {
      races: seriesData.races + 1,
      wins:
        raceResult.finishPositionInClass === 0
          ? seriesData.wins + 1
          : seriesData.wins,
      podiums:
        raceResult.finishPositionInClass < 3
          ? seriesData.podiums + 1
          : seriesData.podiums,
      average:
        (seriesData.average * seriesData.races +
          raceResult.finishPositionInClass) /
        (seriesData.races + 1),
      best: Math.min(seriesData.best, raceResult.finishPositionInClass),
      worst: Math.max(seriesData.worst, raceResult.finishPositionInClass),
      bestGain: Math.max(
        seriesData.bestGain,
        raceResult.startingPositionInClass - raceResult.finishPositionInClass
      ),
      lapsLead: seriesData.lapsLead + raceResult.lapsLead,
      lapsCompleted: seriesData.lapsCompleted + raceResult.lapsComplete,
      iRatingDiff:
        seriesData.iRatingDiff + raceResult.newiRating - raceResult.oldiRating,
      incidents: seriesData.incidents + raceResult.incidents,
    },
  };
};
