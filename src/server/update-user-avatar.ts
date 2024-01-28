"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

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
