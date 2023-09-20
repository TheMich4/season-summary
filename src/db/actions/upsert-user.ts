import { prisma } from "../index.js";

export const upsertUser = async (iracingId: number) => {
  return await prisma.user.upsert({
    where: {
      iracingId,
    },
    create: {
      iracingId,
    },
    update: {},
  });
};
