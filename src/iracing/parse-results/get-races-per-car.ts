export const getRacesPerCar = (currentRacesPerCar: any, raceResult: any) => {
  const { carName } = raceResult;

  return {
    ...currentRacesPerCar,
    [carName]: (currentRacesPerCar[carName] ?? 0) + 1,
  };
};

const getDriverResult = (result: any, iracingId: string) => {
  const raceResult = result.sessionResults
    .find((r: any) => r.simsessionType === 6)
    ?.results?.find(
      (r: any) =>
        r.custId === parseInt(iracingId, 10) ||
        r.driverResults?.some(
          (dr: any) => dr.custId === parseInt(iracingId, 10)
        )
    );
  return (
    raceResult?.driverResults?.find(
      (dr: any) => dr.custId === parseInt(iracingId, 10)
    ) ?? raceResult
  );
};
