"use server"

import { env } from "@/env.mjs"
import IracingAPI from "iracing-api"

export const iracingSearch = async (searchTerm: string) => {
  console.log("iracing-search", { searchTerm })

  const ir = new IracingAPI()
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD)

  const drivers = await ir.getDrivers({ searchTerm })

  return drivers
}
