"use server";

import { type Category } from "@/config/category";
import { api } from "@/trpc/server";

export const setCurrentUserConfig = async (
  iracingId: string,
  preferFull: boolean,
  favoriteCategory: Category,
) => {
  return await api.user.setConfig.mutate({
    iracingId,
    preferFull,
    favoriteCategory,
  });
};
