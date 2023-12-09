"use server";

import { authOptions, prisma } from "@/config/auth-options";

import { Category } from "@/config/category";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const setCurrentUserConfig = async (
  iracingId: string,
  preferFull: boolean,
  favoriteCategory: Category
) => {
  console.log({ favoriteCategory });
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
      preferFull,
      favoriteCategory,
    },
  });
};
