export const getRacesPerWeek = (currentRacesPerWeek: any, result: any) => {
  return {
    ...currentRacesPerWeek,
    [result.raceWeekNum]: (currentRacesPerWeek[result.raceWeekNum] ?? 0) + 1,
  };
};
