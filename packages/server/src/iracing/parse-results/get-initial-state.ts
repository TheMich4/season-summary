export const getInitialState = () => {
  return {
    carData: {},
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
    racesPerCar: {},
    racesPerSeries: {},
    racesPerTrack: {},
    racesPerWeek: {},
    raceResults: [],
    safetyRatingPoints: [],
    stats: {
      laps: 0,
      races: 0,
      top5: 0,
      wins: 0,
    },
    finishPositions: {},
    seriesData: {},
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
    trackData: {},
    iRatingData: {
      start: null,
      end: null,
      points: [],
    },
    safetyRatingData: {
      start: null,
      end: null,
      points: [],
    },
  };
};
