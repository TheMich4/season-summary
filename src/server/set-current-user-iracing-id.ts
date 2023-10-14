"use server";

import { authOptions, prisma } from "@/config/auth-options";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const setCurrentUserIracingId = async (iracingId: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  return await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      iracingId: iracingId ? iracingId : null,
    },
  });
};
