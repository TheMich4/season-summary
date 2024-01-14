"use server";

import { prisma } from "@/config/auth-options";

export const getDriverSeasons = async (iracingId: string) => {
  const seasonIds = await prisma.seasonData.findMany({
    where: { userId: +iracingId },
    select: {
      seasonId: true,
    },
  });

  return await prisma.season.findMany({
    where: {
      id: {
        in: seasonIds.map((season) => season.seasonId),
      },
    },
    select: {
      season: true,
      year: true,
      category: true,
    },
  });
};
