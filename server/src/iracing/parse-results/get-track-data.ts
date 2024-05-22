export const getTrackData = (
  currentTrackData: any,
  raceResult: any,
  result: any
) => {
  const trackData = currentTrackData[result.track.trackName] ?? {
    races: 0,
    wins: 0,
    podiums: 0,
    average: 0,
    best: 999,
    worst: 0,
    bestGain: 0,
    lapsLead: 0,
    lapsCompleted: 0,
    iRatingDiff: 0,
    incidents: 0,
  };

  return {
    ...currentTrackData,
    [result.track.trackName]: {
      races: trackData.races + 1,
      wins:
        raceResult.finishPositionInClass === 0
          ? trackData.wins + 1
          : trackData.wins,
      podiums:
        raceResult.finishPositionInClass < 3
          ? trackData.podiums + 1
          : trackData.podiums,
      average:
        (trackData.average * trackData.races +
          raceResult.finishPositionInClass) /
        (trackData.races + 1),
      best: Math.min(trackData.best, raceResult.finishPositionInClass),
      worst: Math.max(trackData.worst, raceResult.finishPositionInClass),
      bestGain: Math.max(
        trackData.bestGain,
        raceResult.startingPositionInClass - raceResult.finishPositionInClass
      ),
      lapsLead: trackData.lapsLead + raceResult.lapsLead,
      lapsCompleted: trackData.lapsCompleted + raceResult.lapsComplete,
      iRatingDiff:
        trackData.iRatingDiff + raceResult.newiRating - raceResult.oldiRating,
      incidents: trackData.incidents + raceResult.incidents,
    },
  };
};
