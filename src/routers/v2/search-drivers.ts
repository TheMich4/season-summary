import { getLoggedInIracingAPIClient } from "../../iracing/client";

export const searchDrivers = async (request: Request) => {
  console.log("xxx");
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  console.log("searchTerm", searchTerm);

  if (!searchTerm) {
    return new Response("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();
  const drivers = await ir.getDrivers({ searchTerm });
  console.log("drivers", drivers);

  return new Response(JSON.stringify({ drivers }), { status: 200 });
};
