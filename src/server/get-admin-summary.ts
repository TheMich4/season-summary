"use server";

import { prisma } from "@/config/auth-options";

export const getAdminSummary = async () => {
  const [userCount] = await Promise.all([
    prisma.user.count({
      select: {
        emailVerified: true,
        favoriteCategory: true,
        preferFull: true,
        isAdmin: true,
        _all: true,
      },
    }),
  ]);

  return { userCount };
};
