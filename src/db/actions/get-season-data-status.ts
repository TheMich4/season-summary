import { prisma } from "../index.js";
import { upsertUser } from "./upsert-user.js";

export const getSeasonDataStatus = async (
  iracingId: number,
  seasonId: number
) => {
  const seasonDataStatus = await prisma.seasonData.findFirst({
    where: {
      seasonId,
      userId: iracingId,
    },
    select: {
      isPending: true,
      lastUpdate: true,
      lastRace: true,
    },
  });

  if (seasonDataStatus) {
    return seasonDataStatus;
  }

  await upsertUser(iracingId);

  return await prisma.seasonData.create({
    data: {
      seasonId,
      userId: iracingId,
    },
    select: {
      isPending: true,
      lastUpdate: true,
      lastRace: true,
    },
  });
};
