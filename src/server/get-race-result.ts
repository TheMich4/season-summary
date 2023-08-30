"use server";

import IracingAPI from "iracing-api";
import { env } from "@/env.mjs";

export const getRaceResult = async (subsessionId: string | number) => {
  const ir = new IracingAPI();
  await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD);

  const result = await ir.getResult({
    subsessionId: parseInt(subsessionId as string, 10),
  });

  // Get only race results
  if (result?.eventType !== 5) {
    return null;
  }

  return result;
};
