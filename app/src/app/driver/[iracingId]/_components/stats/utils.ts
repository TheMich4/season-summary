export interface PerformanceStats {
  races: number;
  wins: number;
  podiums: number;
  top5: number;
  averageFinish: number;
  iRatingChange: number;
}

export interface TrackPerformance {
  name: string;
  races: number;
  wins: number;
  podiums: number;
  bestFinish: number;
  averageFinish: number;
  incidents: number;
}

export interface VehiclePerformance {
  name: string;
  races: number;
  wins: number;
  podiums: number;
  bestFinish: number;
  averageFinish: number;
  incidents: number;
  iRatingDiff: number;
}

export interface IncidentStats {
  incidentsPerRace: number;
  incidentsPerLap: number;
  totalIncidents: number;
  averageIncidentsPerRace: number;
}

export const calculatePerformanceStats = (data: any): PerformanceStats => {
  return {
    races: data.stats.races,
    wins: data.stats.wins,
    podiums: data.race.podiums,
    top5: data.stats.top5,
    averageFinish: data.race.average,
    iRatingChange: data.iRatingData.end - data.iRatingData.start,
  };
};

export const calculateBestTracks = (trackData: Record<string, any>): TrackPerformance[] => {
  return Object.entries(trackData)
    .map(([name, data]: [string, any]) => ({
      name,
      races: data.races,
      wins: data.wins,
      podiums: data.podiums,
      bestFinish: data.best,
      averageFinish: data.average,
      incidents: data.incidents,
    }))
    .sort((a, b) => a.averageFinish - b.averageFinish)
    .slice(0, 5);
};

export const calculateVehiclePerformance = (carData: Record<string, any>): VehiclePerformance[] => {
  return Object.entries(carData)
    .map(([name, data]: [string, any]) => ({
      name,
      races: data.races,
      wins: data.wins,
      podiums: data.podiums,
      bestFinish: data.best,
      averageFinish: data.average,
      incidents: data.incidents,
      iRatingDiff: data.iRatingDiff,
    }))
    .sort((a, b) => {
      // Sort by average finish, but prioritize vehicles with more races
      if (a.races >= 3 && b.races < 3) return -1;
      if (a.races < 3 && b.races >= 3) return 1;
      return a.averageFinish - b.averageFinish;
    });
};

export const calculateIncidentStats = (incidents: any): IncidentStats => {
  return {
    incidentsPerRace: incidents.incidentsPerRace.value,
    incidentsPerLap: incidents.incidentsPerLap.value,
    totalIncidents: incidents.incidentsPerRace.total,
    averageIncidentsPerRace: incidents.incidentsPerRace.value,
  };
}; 