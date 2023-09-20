// import { getResult, setResult } from "../data/results.js";

import { getLoggedInIracingAPIClient } from "../client.js";

export const getRaceResult = async (subsessionId: string) => {
  try {
    // console.log("getRaceResult", subsessionId);

    // const savedResult = getResult(subsessionId);

    // if (savedResult) {
    //   console.log("returning saved result", subsessionId);
    //   return savedResult;
    // }

    const ir = await getLoggedInIracingAPIClient();

    const result = await ir.getResult({
      subsessionId: parseInt(subsessionId, 10),
    });

    // Get only race results
    if (result?.eventType !== 5) {
      return null;
    }

    // setResult(subsessionId, result);

    return result;
  } catch (e) {
    console.log("getRaceResult", subsessionId);
    console.error(e);
    return { error: e };
  }
};
