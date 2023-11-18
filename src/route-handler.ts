import { getFullDataRoute } from "./routers/get-full-data";
import { getFullDataStatusRoute } from "./routers/get-full-data-status";
import { getIracingData } from "./routers/v2/get-iracing-data";
import { getNew } from "./routers/v2/get-new";
import { getRaceResult } from "./routers/v2/get-race-result";
import { handleWebsocketUpgrade } from "./routers/handle-websocket-upgrade";
import { requestNew } from "./routers/v2/request-new";
import { searchDrivers } from "./routers/v2/search-drivers";

export const routeHandler = new Proxy(
  {
    ["/"]: () => new Response("season-summary-api", { status: 200 }),
    ["/get-full-data"]: getFullDataRoute,
    ["/get-full-data-status"]: getFullDataStatusRoute,

    ["/v2/get-full"]: getNew,
    ["/v2/request-full"]: requestNew,

    ["/v2/get-iracing-data"]: getIracingData,
    ["/v2/get-race-result"]: getRaceResult,
    ["/v2/search-drivers"]: searchDrivers,

    ["/ws"]: handleWebsocketUpgrade,
  },
  {
    get: (target, name: string) =>
      target[name] || (() => new Response("Not Found", { status: 404 })),
  }
);
