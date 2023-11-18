import { getFullDataRoute } from "./routers/get-full-data";
import { getFullDataStatusRoute } from "./routers/get-full-data-status";
import { getNew } from "./routers/get-new";
import { handleWebsocketUpgrade } from "./routers/handle-websocket-upgrade";
import { requestNew } from "./routers/request-new";

export const routeHandler = new Proxy(
  {
    ["/"]: () => new Response("season-summary-api", { status: 200 }),
    ["/get-full-data"]: getFullDataRoute,
    ["/get-full-data-status"]: getFullDataStatusRoute,
    ["/v2/get-full"]: getNew,
    ["/v2/request-full"]: requestNew,

    ["/ws"]: handleWebsocketUpgrade,
  },
  {
    get: (target, name: string) =>
      target[name] || (() => new Response("Not Found", { status: 404 })),
  }
);
