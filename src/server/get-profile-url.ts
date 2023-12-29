"use server";

import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "./get-user-settings";

export const getProfileUrl = async (iracingId: string) => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    `/driver/${iracingId}` +
    (userSettings?.preferFull ? "/full" : "") +
    `?category=${userSettings?.favoriteCategory ?? "road"}`
  );
};
