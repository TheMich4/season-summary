import { prisma } from "../db";

const deleteCorruptedSeasonData = async () => {
  let cutOffDate = new Date();
  cutOffDate.setDate(cutOffDate.getDate() - 1);

  const { count } = await prisma.seasonData.deleteMany({
    where: {
      lastRace: {
        equals: null,
      },
      lastUpdate: {
        lt: cutOffDate,
      },
    },
  });

  console.log(`Deleted ${count} corrupted season data records.`);
};

await deleteCorruptedSeasonData();
