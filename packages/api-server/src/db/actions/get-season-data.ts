import { getSeasonId } from "./get-season-id.js";
import { prisma } from "../index.js";

export const getSeasonData = async (
  iracingId: number,
  year: number,
  season: number,
  category: number
) => {
  const seasonId = await getSeasonId(year, season, category);

  if (!seasonId) {
    return null;
  }

  return await prisma.seasonData.findFirst({
    where: {
      seasonId,
      userId: iracingId,
    },
    include: {
      data: true,
    },
  });
};
