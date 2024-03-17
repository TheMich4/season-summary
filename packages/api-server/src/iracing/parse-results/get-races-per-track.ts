export const getRacesPerTrack = (currentRacesPerTrack: any, result: any) => {
  return {
    ...currentRacesPerTrack,
    [result.track.trackName]:
      (currentRacesPerTrack[result.track.trackName] ?? 0) + 1,
  };
};
