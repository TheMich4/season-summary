import { WebSocketData, websocket } from "./websocket";

import { routeHandler } from "./route-handler";

export const createServer = () => {
  const server = Bun.serve<WebSocketData>({
    port: process.env.PORT,
    fetch(request, server) {
      const url = new URL(request.url);

      return routeHandler[url.pathname](request, server);
    },
    websocket,
  });

  return server;
};
