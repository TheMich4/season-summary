export const getSOFData = (currentSOF: any, raceResult: any, result: any) => {
  const { finishPositionInClass } = raceResult;
  const {
    raceSummary: { fieldStrength },
  } = result;

  return {
    average:
      (currentSOF.average * currentSOF.races + fieldStrength) /
      (currentSOF.races + 1),
    highest: Math.max(currentSOF.highest, fieldStrength),
    highestWin:
      finishPositionInClass === 0 && fieldStrength > currentSOF.highestWin
        ? fieldStrength
        : currentSOF.highestWin,

    lowest: currentSOF.lowest
      ? Math.min(currentSOF.lowest, fieldStrength)
      : fieldStrength,
    races: currentSOF.races + 1,
  };
};
