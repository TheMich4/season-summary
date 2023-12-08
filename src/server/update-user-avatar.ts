"use server";

import { authOptions, prisma } from "@/config/auth-options";

import { getServerSession } from "next-auth";

export const updateUserAvatar = async (avatarUrl: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: avatarUrl,
    },
  });
};
