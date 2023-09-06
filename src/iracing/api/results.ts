import { getLoggedInIracingAPIClient } from "../client.js";
import { getResult } from "../data/results.js";

export const getRaceResult = async (subsessionId: string) => {
  console.log("getRaceResult", subsessionId);

  const savedResult = getResult(subsessionId);

  if (savedResult) {
    console.log("returning saved result", subsessionId);
    return savedResult;
  }

  const ir = await getLoggedInIracingAPIClient();

  const result = await ir.getResult({
    subsessionId: parseInt(subsessionId, 10),
  });

  // Get only race results
  if (result?.eventType !== 5) {
    return null;
  }

  return result;
};
