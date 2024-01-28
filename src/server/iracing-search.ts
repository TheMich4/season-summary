"use server";

import { env } from "@/env";

export const iracingSearch = async (searchTerm: string) => {
  const response = await fetch(
    `${env.API_URL}v2/search-drivers?searchTerm=${searchTerm}`
  );
  const { drivers } = await response.json();

  return drivers;
};
