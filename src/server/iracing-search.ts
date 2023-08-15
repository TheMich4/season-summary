"use server";

import IracingAPI from "iracing-api";
import { env } from "@/env.mjs";

export const iracingSearch = async (searchTerm: string) => {
  const ir = new IracingAPI();
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD);

  const drivers = await ir.getDrivers({ searchTerm });

  return drivers;
};
