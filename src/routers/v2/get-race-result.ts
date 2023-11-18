import { getLoggedInIracingAPIClient } from "../../iracing/client";

export const getRaceResult = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const subsessionId = searchParams.get("subsessionId");

  if (!subsessionId) {
    return new Response("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();

  const result = await ir.getResult({
    subsessionId: parseInt(subsessionId, 10),
  });

  // Get only race results
  if (result?.eventType !== 5) {
    return new Response(JSON.stringify({ data: null }), { status: 200 });
  }

  return new Response(JSON.stringify({ data: result }), { status: 200 });
};
