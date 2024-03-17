import { type Server } from "bun";

export const handleWebsocketUpgrade = (request: Request, server: Server) => {
  const { searchParams } = new URL(request.url);

  const iracingId = searchParams.get("iracingId");
  const year = searchParams.get("year");
  const season = searchParams.get("season");
  const categoryId = searchParams.get("categoryId");

  if (!iracingId || !year || !season || !categoryId) {
    return new Response("missing params", { status: 400 });
  }

  const success = server.upgrade(request, {
    data: { iracingId, year, season, categoryId },
  });

  return success
    ? undefined
    : new Response("WebSocket upgrade error", { status: 400 });
};
