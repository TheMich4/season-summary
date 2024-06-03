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

export const getRandomSeason = () => {
  const minYear = 2011;
  const maxYear = currentSeason.year;
  const minSeason = 1;
  const maxSeason = 4;

  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const season =
    year === currentSeason.year
      ? Math.floor(
          Math.random() * (currentSeason.season - minSeason + 1) + minSeason,
        )
      : Math.floor(Math.random() * (maxSeason - minSeason + 1) + minSeason);

  return {
    year,
    season,
  };
};
