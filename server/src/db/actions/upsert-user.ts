import { prisma } from "../index.js";

export const upsertUser = async (iracingId: number) => {
  return await prisma.iracingUser.upsert({
    where: {
      iracingId,
    },
    create: {
      iracingId,
    },
    update: {},
  });
};
