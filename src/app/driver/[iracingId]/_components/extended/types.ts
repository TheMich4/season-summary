interface AssetData {
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

type AssetsData = Record<string, AssetData>;

interface Asset {
  name: string;
  data: AssetData;
}
