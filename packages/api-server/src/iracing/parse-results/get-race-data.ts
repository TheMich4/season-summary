export const getRaceData = (currentRace: any, raceResult: any) => {
  const start = raceResult.startingPositionInClass + 1;
  const finish = raceResult.finishPositionInClass + 1;
  const gain = start - finish;

  return {
    average:
      (currentRace.average * currentRace.races + finish) /
      (currentRace.races + 1),
    highest: Math.max(currentRace.highest, finish),
    lowest: currentRace.lowest ? Math.min(currentRace.lowest, finish) : finish,
    wins: finish === 1 ? currentRace.wins + 1 : currentRace.wins,
    races: currentRace.races + 1,
    podiums: finish <= 3 ? currentRace.podiums + 1 : currentRace.podiums,
    bestGain: Math.max(currentRace.bestGain, gain),
  };
};
