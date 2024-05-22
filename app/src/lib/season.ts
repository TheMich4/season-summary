import { currentSeason } from "@/config/season";

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

export const isPastSeason = (year: number, season: number) => {
  return isBeforeSeason({ year, season }, currentSeason);
};

export const isBeforeSeason = (
  season: { year: number; season: number },
  compareSeason: { year: number; season: number },
) => {
  if (season.year < compareSeason.year) {
    return true;
  }

  if (
    season.year === compareSeason.year &&
    season.season < compareSeason.season
  ) {
    return true;
  }

  return false;
};
