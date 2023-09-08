export const getFinishPositions = (
  currentFinishPositions: any,
  raceResult: any
) => {
  return {
    ...currentFinishPositions,
    [raceResult.finishPosition + 1]:
      (currentFinishPositions[raceResult.finishPosition + 1] ?? 0) + 1,
  };
};
