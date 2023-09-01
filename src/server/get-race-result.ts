"use server";

import { getLoggedInIracingAPIClient } from "./iracing-api";

export const getRaceResult = async (subsessionId: string | number) => {
  const ir = await getLoggedInIracingAPIClient();

  const result = await ir.getResult({
    subsessionId: parseInt(subsessionId as string, 10),
  });

  // Get only race results
  if (result?.eventType !== 5) {
    return null;
  }

  return result;
};
