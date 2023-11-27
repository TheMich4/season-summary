import { getLoggedInIracingAPIClient } from "../../iracing/client";

export const searchDrivers = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  if (!searchTerm) {
    return new Response("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();
  const drivers = await ir.getDrivers({ searchTerm });

  return new Response(JSON.stringify({ drivers }), { status: 200 });
};
