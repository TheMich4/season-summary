"use server";

import { api } from "@/trpc/server";

export const iracingSearch = async (searchTerm: string) => {
  return api.data.userSearch.query(searchTerm);
};
