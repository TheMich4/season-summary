export const getIncidentsData = (
  currentIncidents: any,
  raceResult: any,
  result: any
) => {
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
