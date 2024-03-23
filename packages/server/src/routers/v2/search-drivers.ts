import { ClientResponse } from "../../response";
import { getLoggedInIracingAPIClient } from "../../iracing/client";

export const searchDrivers = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  if (!searchTerm) {
    return new ClientResponse("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();
  const drivers = await ir.lookup.getDrivers({ searchTerm });

  return new ClientResponse(JSON.stringify({ drivers }), { status: 200 });
};
