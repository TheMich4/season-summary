export const isSeasonOver = (year: number, season: number) => {
  if (year < parseInt(process.env.CURRENT_YEAR!, 10)) {
    return true;
  }

  if (season < parseInt(process.env.CURRENT_SEASON!, 10)) {
    return true;
  }

  return false;
};
