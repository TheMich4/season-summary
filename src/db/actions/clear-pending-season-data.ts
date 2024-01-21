import { prisma } from "..";

export const clearPendingSeasonData = async () => {
  const { count } = await prisma.seasonData.deleteMany({
    where: { isPending: true },
  });

  console.log(`Deleted ${count} pending season data`);
};
