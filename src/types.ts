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

export interface MemberRecap {
  custId: number;
  stats: {
    avgFinishPosition: number;
    avgStartPosition: number;
    favoriteCar: {
      carId: number;
      carImage: string;
      carName: string;
    };
    favoriteTrack: {
      configName: string;
      trackId: number;
      trackLogo: string;
      trackName: string;
    };
    laps: number;
    lapsLed: number;
    starts: number;
    top5: number;
    wins: number;
  };
}
