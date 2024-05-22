"use server";

import type { Category } from "@season-summary/config";
import { DEFAULT_CATEGORY } from "../config/iracing";
import { api } from "@/trpc/server";

export const getProfileUrl = async (
  iracingId: string,
  options?: {
    category: Category;
    season: string | number;
    year: string | number;
  },
) => {
  const userSettings = await api.user.getSettings.query();

  return (
    `/driver/${iracingId}` +
    (userSettings?.preferFull ? "/full" : "") +
    `?category=${
      options?.category ?? userSettings?.favoriteCategory ?? DEFAULT_CATEGORY
    }` +
    (options?.season ? `&season=${options.season}` : "") +
    (options?.year ? `&year=${options.year}` : "")
  );
};
