export const getRacesPerCar = (currentRacesPerCar: any, raceResult: any) => {
  const { carName } = raceResult;

  return {
    ...currentRacesPerCar,
    [carName]: (currentRacesPerCar[carName] ?? 0) + 1,
  };
};
