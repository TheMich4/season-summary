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
  const lapsCount = currentIncidents.incidentsPerLap.count + lapsComplete;
  const raceCount = currentIncidents.incidentsPerRace.count + 1;

  return {
    ...currentIncidents,
    incidentsPerCorner: {
      count: cornerCount,
      total: currentIncidents.incidentsPerRace.total + incidents,
      value:
        (currentIncidents.incidentsPerRace.total + incidents) / cornerCount,
    },
    incidentsPerLap: {
      count: lapsCount,
      total: currentIncidents.incidentsPerRace.total + incidents,
      value: (currentIncidents.incidentsPerRace.total + incidents) / lapsCount,
    },
    incidentsPerRace: {
      count: raceCount,
      total: currentIncidents.incidentsPerRace.total + incidents,
      value: (currentIncidents.incidentsPerRace.total + incidents) / raceCount,
    },
    incidentPoints: [...currentIncidents.incidentPoints, incidents],
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

const getSOFData = (currentSOF: any, raceResult: any, result: any) => {
  const { finishPositionInClass } = raceResult;
  const {
    raceSummary: { fieldStrength },
  } = result;

  return {
    average:
      (currentSOF.average * currentSOF.races + fieldStrength) /
      (currentSOF.races + 1),
    highest: Math.max(currentSOF.highest, fieldStrength),
    highestWin:
      finishPositionInClass === 0 && fieldStrength > currentSOF.highestWin
        ? fieldStrength
        : currentSOF.highestWin,

    lowest: currentSOF.lowest
      ? Math.min(currentSOF.lowest, fieldStrength)
      : fieldStrength,
    races: currentSOF.races + 1,
  };
};

const getPointData = (currentPoints: any, raceResult: any) => {
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

const getQualiData = (currentQuali: any, raceResult: any) => {
  const start = raceResult.startingPositionInClass + 1;

  return {
    average:
      (currentQuali.average * currentQuali.races + start) /
      (currentQuali.races + 1),
    highest: Math.max(currentQuali.highest, start),
    lowest: currentQuali.lowest ? Math.min(currentQuali.lowest, start) : start,
    poles: start === 1 ? currentQuali.poles + 1 : currentQuali.poles,
    races: currentQuali.races + 1,
  };
};

const getRaceData = (currentRace: any, raceResult: any) => {
  const start = raceResult.startingPositionInClass + 1;
  const finish = raceResult.finishPositionInClass + 1;
  const gain = start - finish;

  return {
    average:
      (currentRace.average * currentRace.races + finish) /
      (currentRace.races + 1),
    highest: Math.max(currentRace.highest, finish),
    lowest: currentRace.lowest ? Math.min(currentRace.lowest, finish) : finish,
    wins: finish === 1 ? currentRace.wins + 1 : currentRace.wins,
    races: currentRace.races + 1,
    podiums: finish <= 3 ? currentRace.podiums + 1 : currentRace.podiums,
    bestGain: Math.max(currentRace.bestGain, gain),
  };
};

export const parseExtendedData = (results: Array<any>, iracingId: string) => {
  return results?.reduce(
    (acc, result, index) => {
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
        stats: {
          races: index + 1,
          wins: acc.stats.wins + (raceResult.finishPosition === 1 ? 1 : 0),
        },
        finishPositions: {
          ...acc.finishPositions,
          [raceResult.finishPosition + 1]:
            (acc.finishPositions[raceResult.finishPosition + 1] ?? 0) + 1,
        },
        sof: getSOFData(acc.sof, raceResult, result),
        points: getPointData(acc.points, raceResult),
        quali: getQualiData(acc.quali, raceResult),
        race: getRaceData(acc.race, raceResult),
      };
    },
    {
      incidents: {
        incidentsPerCorner: {
          count: 0, // Corner count
          total: 0,
          value: 0,
        },
        incidentsPerLap: {
          count: 0, // Lap count
          total: 0,
          value: 0,
        },
        incidentsPerRace: {
          count: 0, // Race count
          total: 0,
          value: 0,
        },
        incidentPoints: [],
      },
      iratingPoints: [],
      racesPerSeries: {},
      racesPerTrack: {},
      racesPerWeek: {},
      raceResults: [],
      safetyRatingPoints: [],
      stats: {
        races: 0,
        wins: 0,
      },
      finishPositions: {},
      sof: {
        average: 0,
        highest: null,
        lowest: null,
        highestWin: null,
        races: 0,
      },
      points: {
        average: 0,
        highest: null,
        lowest: null,
        races: 0,
      },
      quali: {
        average: 0,
        highest: null,
        lowest: null,
        poles: 0,
        races: 0,
        beatNo: 0,
        lostNo: 0,
      },
      race: {
        average: 0,
        highest: null,
        lowest: null,
        wins: 0,
        races: 0,
        beatNo: 0,
        lostNo: 0,
        podiums: 0,
        bestGain: 0,
        worstLoss: 0,
      },
    }
  );
};
