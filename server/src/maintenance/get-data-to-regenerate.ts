import { prisma } from "../db";

export const getDataToRegenerate = async () => {
  const seasonData = await prisma.seasonData.findMany({
    where: {
      lastRace: {
        not: null,
      },
    },
    select: {
      userId: true,
      season: {
        select: {
          category: true,
          season: true,
          year: true,
        },
      },
    },
  });

  const groupedSeasonData = seasonData.reduce((acc, { userId, season }) => {
    const key = `${season.category}-${season.season}-${season.year}`;

    if (!acc[key]) {
      acc[key] = {
        season,
        userIds: [],
      };
    }

    return {
      ...acc,
      [key]: {
        ...acc[key],
        userIds: [...acc[key].userIds, userId],
      },
    };
  }, {});


  const sortedGroupedSeasonData = Object.values(groupedSeasonData).sort((a,b )=> {
    if (a.season.year === b.season.year) {
      if (a.season.season === b.season.season) {
        return a.season.category - b.season.category;
      } else {
        return b.season.season - a.season.season;
      }
    } else {
      return b.season.year - a.season.year;
    }
  });


  return groupedSeasonData;
};
