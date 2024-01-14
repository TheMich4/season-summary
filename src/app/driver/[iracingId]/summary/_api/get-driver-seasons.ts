"use server";

import { prisma } from "@/config/auth-options";
import { categoryIdToKey } from "@/config/category";

const omit = (obj: Record<string, any> | undefined, keys: string[]) => {
  if (!obj) return obj;

  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

// TODO: Refactor this to use prisma.include
export const getDriverSeasons = async (iracingId: string) => {
  const seasonData = await prisma.seasonData.findMany({
    where: { userId: +iracingId },
    select: {
      id: true,
      seasonId: true,
    },
  });

  const seasons = await prisma.season.findMany({
    where: {
      id: {
        in: seasonData.map((season) => season.seasonId),
      },
    },
    select: {
      id: true,
      season: true,
      year: true,
      category: true,
    },
  });

  const data = await prisma.data.findMany({
    where: {
      seasonDataId: {
        in: seasonData.map((season) => season.id),
      },
    },
    select: {
      seasonDataId: true,
      finalIRating: true,
      stats: true,
    },
  });

  const parsedData = seasonData.map((sd) => {
    const season = seasons.find((s) => s.id === sd.seasonId) as Record<
      string,
      any
    >;
    const d = data.find((d) => d.seasonDataId === sd.id) as Record<string, any>;

    return {
      season: omit(season, ["id"]) as Record<string, any>,
      data: omit(d, ["seasonDataId"]),
    };
  });

  const grouped = parsedData.reduce((acc, curr) => {
    const { season, data } = curr;
    const key = `${season.season}-${season.year}`;
    const category = categoryIdToKey[season.category];

    if (!category) return acc;

    return {
      ...acc,
      [key]: {
        ...acc[key],
        season: omit(season, ["category"]),
        data: {
          ...acc[key]?.data,
          [category]: data,
        },
      },
    };
  }, {} as Record<string, any>);

  return Object.values(grouped).sort((a, b) => {
    if (a.season.year > b.season.year) return -1;
    if (a.season.year < b.season.year) return 1;
    if (a.season.season > b.season.season) return -1;
    if (a.season.season < b.season.season) return 1;
    return 0;
  });
};
