import { prisma } from "../index.js";

export const getSeasonId = async (
  year: number,
  season: number,
  category: number
) => {
  const seasonData = await prisma.season.findFirst({
    where: {
      year,
      season,
      category,
    },
    select: {
      id: true,
    },
  });

  return seasonData?.id;
};
