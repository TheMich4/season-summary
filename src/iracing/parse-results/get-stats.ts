export const getStats = (currentStats: any, raceResult: any, index: number) => {
  return {
    laps:
      currentStats.laps +
      (raceResult.lapsComplete > 0 ? raceResult.lapsComplete : 0),
    races: index + 1,
    top5: currentStats.top5 + (raceResult.finishPosition < 5 ? 1 : 0),
    wins: currentStats.wins + (raceResult.finishPosition === 1 ? 1 : 0),
  };
};
