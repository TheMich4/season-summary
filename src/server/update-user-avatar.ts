"use server";

import { api } from "@/trpc/server";

export const updateUserAvatar = async (avatarUrl: string) => {
  return await api.user.updateAvatar.mutate({ avatarUrl });
};
