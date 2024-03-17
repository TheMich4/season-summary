export const getPreviousSeason = (year: number, season: number) => {
  if (season === 1) {
    return {
      year: year - 1,
      season: 4,
    };
  }

  return {
    year,
    season: season - 1,
  };
};
