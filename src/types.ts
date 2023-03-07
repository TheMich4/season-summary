export interface Driver {
  id: number;
  name: string;
  iracingId: number;
}

export interface MemberData {
  custId: number;
  displayName: string;
  memberSince: string;
  clubName: string;
}

export interface Car {
  carId: number;
  carImage: string;
  carName: string;
}

export interface Track {
  configName: string;
  trackId: number;
  trackLogo: string;
  trackName: string;
}

export interface MemberRecap {
  custId: number;
  stats: {
    avgFinishPosition: number;
    avgStartPosition: number;
    favoriteCar: Car;
    favoriteTrack: Track;
    laps: number;
    lapsLed: number;
    starts: number;
    top5: number;
    wins: number;
  };
}
