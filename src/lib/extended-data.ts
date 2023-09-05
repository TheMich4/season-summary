const getDriverResult = (result: any, iracingId: string) => {
  const raceResult = result.sessionResults
    .find((r) => r.simsessionType === 6)
    ?.results?.find(
      (r) =>
        r.custId === parseInt(iracingId, 10) ||
        r.driverResults?.some((dr) => dr.custId === parseInt(iracingId, 10))
    );
  return (
    raceResult?.driverResults?.find(
      (dr) => dr.custId === parseInt(iracingId, 10)
    ) ?? raceResult
  );
};

const getIncidentsData = (
  currentIncidents: any,
  raceResult: any,
  result: any
) => {
  // TODO: Add incidents per corner
  const { incidents, lapsComplete } = raceResult;
  const { cornersPerLap } = result;

  if (lapsComplete < 1) {
    return currentIncidents;
  }

  const cornerCount =
    currentIncidents.incidentsPerCorner.count + cornersPerLap * lapsComplete;
  const raceCount = currentIncidents.incidentsPerRace.count + 1;

  return {
    ...currentIncidents,
    incidentsPerCorner: {
      count: cornerCount,
      total: currentIncidents.incidentsPerRace.total + incidents,
      value:
        (currentIncidents.incidentsPerRace.total + incidents) / cornerCount,
    },
    incidentsPerRace: {
      count: raceCount,
      total: currentIncidents.incidentsPerRace.total + incidents,
      value:
        Math.round(
          ((currentIncidents.incidentsPerRace.total + incidents) / raceCount) *
            100
        ) / 100,
    },
  };
};

const getIratingPoints = (currentIratingPoints: Array<number>, result: any) => {
  const { newiRating, oldiRating } = result;

  if (newiRating === -1) {
    return currentIratingPoints;
  }

  if (currentIratingPoints.length === 0 && oldiRating !== -1) {
    return [oldiRating, newiRating];
  }

  return [...currentIratingPoints, newiRating];
};

const getSafetyRatingPoints = (
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

export const parseExtendedData = (results: Array<any>, iracingId: string) => {
  return results?.reduce(
    (acc, result) => {
      const raceResult = getDriverResult(result, iracingId);

      return {
        ...acc,
        incidents: getIncidentsData(acc.incidents, raceResult, result),
        iratingPoints: getIratingPoints(acc.iratingPoints, raceResult),
        raceResults: [...acc.raceResults, raceResult],
        // Races per series
        racesPerSeries: {
          ...acc.racesPerSeries,
          [result.seriesName]: (acc.racesPerSeries[result.seriesName] ?? 0) + 1,
        },
        // Races per track
        racesPerTrack: {
          ...acc.racesPerTrack,
          [result.track.trackName]:
            (acc.racesPerTrack[result.track.trackName] ?? 0) + 1,
        },
        // Races per week
        racesPerWeek: {
          ...acc.racesPerWeek,
          [result.raceWeekNum + 1]:
            (acc.racesPerWeek[result.raceWeekNum + 1] ?? 0) + 1,
        },
        safetyRatingPoints: getSafetyRatingPoints(
          acc.safetyRatingPoints,
          raceResult
        ),
      };
    },
    {
      incidents: {
        incidentsPerCorner: {
          count: 0, // Corner count
          total: 0,
          value: 0,
        },
        incidentsPerRace: {
          count: 0, // Race count
          total: 0,
          value: 0,
        },
      },
      iratingPoints: [],
      racesPerSeries: {},
      racesPerTrack: {},
      racesPerWeek: {},
      raceResults: [],
      safetyRatingPoints: [],
    }
  );
};
