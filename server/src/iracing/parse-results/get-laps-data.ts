export const getLapsData = (currentLaps: any, raceResult: any) => {
  return {
    lead: currentLaps.lead + raceResult.lapsLead,
    total: currentLaps.total + raceResult.lapsComplete,
  };
};
