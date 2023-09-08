export const getQualiData = (currentQuali: any, raceResult: any) => {
  const start = raceResult.startingPositionInClass + 1;

  return {
    average:
      (currentQuali.average * currentQuali.races + start) /
      (currentQuali.races + 1),
    highest: Math.max(currentQuali.highest, start),
    lowest: currentQuali.lowest ? Math.min(currentQuali.lowest, start) : start,
    poles: start === 1 ? currentQuali.poles + 1 : currentQuali.poles,
    races: currentQuali.races + 1,
  };
};
