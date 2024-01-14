"use server";

import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "./get-user-settings";
import { type Category } from "@/config/category";

export const getProfileUrl = async (
  iracingId: string,
  options?: {
    category: Category | string;
    season: string | number;
    year: string | number;
  }
) => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    `/driver/${iracingId}` +
    (userSettings?.preferFull ? "/full" : "") +
    `?category=${
      options?.category ?? userSettings?.favoriteCategory ?? "road"
    }` +
    (options?.season ? `&season=${options.season}` : "") +
    (options?.year ? `&year=${options.year}` : "")
  );
};
