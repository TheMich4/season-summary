export interface AssetData {
  average: number;
  best: number;
  bestGain: number;
  iRatingDiff: number;
  incidents: number;
  lapsCompleted: number;
  lapsLead: number;
  podiums: number;
  races: number;
  wins: number;
  worst: number;
}

export interface SOFData {
  races: number;
  lowest: number;
  average: number;
  highest: number;
  highestWin: number;
}

export interface LapsData {
  lead: number;
  total: number;
}

export interface RaceData {
  wins: number;
  races: number;
  lowest: number;
  average: number;
  highest: number;
  podiums: number;
  bestGain: number;
}

export interface QualiData {
  poles: number;
  races: number;
  lowest: number;
  average: number;
  highest: number;
}

export interface PointsData {
  races: number;
  lowest: number;
  average: number;
  highest: number;
}

export interface IncidentsData {
  incidentPoints: number[];
  incidentsPerLap: {
    count: number;
    total: number;
    value: number;
  };
  incidentsPerRace: {
    count: number;
    total: number;
    value: number;
  };
  incidentsPerCorner: {
    count: number;
    total: number;
    value: number;
  };
}

export interface ReasonOutData {
  Running: number;
  Disconnected: number;
  Disqualified: number;
}

export interface RatingData {
  end: number;
  start: number;
  points: number[];
}

export interface DriverStats {
  sof: SOFData;
  laps: LapsData;
  race: RaceData;
  quali: QualiData;
  points: PointsData;
  carData: Record<string, AssetData>;
  activity: Record<string, number>;
  incidents: IncidentsData;
  reasonOut: ReasonOutData;
  trackData: Record<string, AssetData>;
  seriesData: Record<string, AssetData>;
  iRatingData: RatingData;
  racesPerWeek: Record<string, number>;
  iratingPoints: number[];
  finishPositions: Record<string, number>;
  safetyRatingData: RatingData;
  safetyRatingPoints: number[];
  stats: {
    laps: number;
    top5: number;
    wins: number;
    races: number;
  };
  finalIRating: number;
}

export interface DriverData {
  data: DriverStats;
} 