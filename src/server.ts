import { WebSocketData, websocket } from "./websocket";

import { routeHandler } from "./route-handler";

export const createServer = () => {
  const server = Bun.serve<WebSocketData>({
    port: process.env.PORT,
    fetch(request, server) {
      const url = new URL(request.url);

      const pathname =
        url.pathname.charAt(url.pathname.length - 1) === "/"
          ? url.pathname.slice(0, -1)
          : url.pathname;

      return routeHandler[pathname](request, server);
    },
    websocket,
  });

  return server;
};
