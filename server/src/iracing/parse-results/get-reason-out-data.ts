export const getReasonOutData = (currentReasonOut: any, raceResult: any) => {
  const { reasonOut } = raceResult;

  return {
    ...currentReasonOut,
    [reasonOut]: (currentReasonOut[reasonOut] ?? 0) + 1,
  };
};
