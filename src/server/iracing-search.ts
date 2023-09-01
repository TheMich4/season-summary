"use server";

import { getLoggedInIracingAPIClient } from "./iracing-api";

export const iracingSearch = async (searchTerm: string) => {
  const ir = await getLoggedInIracingAPIClient();

  const drivers = await ir.getDrivers({ searchTerm });

  return drivers;
};
