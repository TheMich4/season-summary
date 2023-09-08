export const getStats = (currentStats: any, raceResult: any, index: number) => {
  return {
    races: index + 1,
    wins: currentStats.wins + (raceResult.finishPosition === 1 ? 1 : 0),
  };
};
