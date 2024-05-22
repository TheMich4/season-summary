export const getCarData = (currentCarData: any, raceResult: any) => {
  const { carName } = raceResult;

  const carData = currentCarData[carName] ?? {
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
    ...currentCarData,
    [carName]: {
      races: carData.races + 1,
      wins:
        raceResult.finishPositionInClass === 0
          ? carData.wins + 1
          : carData.wins,
      podiums:
        raceResult.finishPositionInClass < 3
          ? carData.podiums + 1
          : carData.podiums,
      average:
        (carData.average * carData.races + raceResult.finishPositionInClass) /
        (carData.races + 1),
      best: Math.min(carData.best, raceResult.finishPositionInClass),
      worst: Math.max(carData.worst, raceResult.finishPositionInClass),
      bestGain: Math.max(
        carData.bestGain,
        raceResult.startingPositionInClass - raceResult.finishPositionInClass
      ),
      lapsLead: carData.lapsLead + raceResult.lapsLead,
      lapsCompleted: carData.lapsCompleted + raceResult.lapsComplete,
      iRatingDiff:
        carData.iRatingDiff + raceResult.newiRating - raceResult.oldiRating,
      incidents: carData.incidents + raceResult.incidents,
    },
  };
};
