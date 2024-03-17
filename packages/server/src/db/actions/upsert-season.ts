import { isSeasonOver } from "../../utils/is-season-over.js";
import { prisma } from "../index.js";

export const upsertSeason = async (
  year: number,
  season: number,
  category: number
) => {
  return await prisma.season.upsert({
    where: {
      year_season_category: {
        year,
        season,
        category,
      },
    },
    create: {
      year,
      season,
      category,
      isOver: isSeasonOver(year, season),
    },
    update: {},
  });
};
