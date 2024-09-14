import { ClientResponse } from "../../response";
import { getLoggedInIracingAPIClient } from "../../iracing/client";

export const getRaceLapData = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");
  const subsessionId = searchParams.get("subsessionId");
  const simsessionNumber = searchParams.get("simsessionNumber");

  if (!customerId || !subsessionId || !simsessionNumber) {
    return new ClientResponse("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();

  const data = await ir.results.getResultsLapData(
    {
      customerId: +customerId,
      subsessionId: +subsessionId,
      simsessionNumber: +simsessionNumber,
    },
    {
      getAllChunks: true,
    },
  );

  return new ClientResponse(JSON.stringify({ data }), {
    status: 200,
  });
};
