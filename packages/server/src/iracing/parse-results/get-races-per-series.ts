export const getRacesPerSeries = (currentRacesPerSeries: any, result: any) => {
  return {
    ...currentRacesPerSeries,
    [result.seriesName]: (currentRacesPerSeries[result.seriesName] ?? 0) + 1,
  };
};
