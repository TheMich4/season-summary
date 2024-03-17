import { prisma } from "..";

export const clearPendingSeasonData = async () => {
  try {
    const { count } = await prisma.seasonData.deleteMany({
      where: { isPending: true },
    });

    console.log(`Deleted ${count} pending season data`);
  } catch (e) {
    console.error("Error in clearing pending season data");
    console.error(e);
  }
};
