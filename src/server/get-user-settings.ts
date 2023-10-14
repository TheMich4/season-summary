import { prisma } from "@/config/auth-options";

export const getUserSettings = async (userId: string) => {
  const userSettings = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      iracingId: true,
    },
  });

  return userSettings;
};
