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
  if (year < currentSeason.year) {
    return true;
  }

  if (year === currentSeason.year && season < currentSeason.season) {
    return true;
  }

  return false;
};
