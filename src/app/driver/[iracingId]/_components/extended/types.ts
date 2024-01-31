export interface AssetData {
  average: number;
  best: number;
  bestGain: number;
  iratingDiff: number;
  incidents: number;
  lapsCompleted: number;
  lapsLead: number;
  podiums: number;
  races: number;
  wins: number;
  worst: number;
}

export type AssetsData = Record<string, AssetData>;

export interface Asset {
  name: string;
  data: AssetData;
}
