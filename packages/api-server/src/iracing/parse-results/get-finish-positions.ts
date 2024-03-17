export const getFinishPositions = (
  currentFinishPositions: any,
  raceResult: any
) => {
  return {
    ...currentFinishPositions,
    [raceResult.finishPositionInClass + 1]:
      (currentFinishPositions[raceResult.finishPositionInClass + 1] ?? 0) + 1,
  };
};
