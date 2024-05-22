import { ClientResponse } from "./response";
import { getAvatars } from "./routers/v2/get-avatars";
import { getBasicData } from "./routers/v2/get-basic-data";
import { getIracingData } from "./routers/v2/get-iracing-data";
import { getNew } from "./routers/v2/get-new";
import { getRaceResult } from "./routers/v2/get-race-result";
import { handleWebsocketUpgrade } from "./routers/handle-websocket-upgrade";
import { requestNew } from "./routers/v2/request-new";
import { searchDrivers } from "./routers/v2/search-drivers";

export const routeHandler = new Proxy(
  {
    ["/"]: () => new ClientResponse("season-summary-api", { status: 200 }),
    // ["/get-full-data"]: getFullDataRoute,
    // ["/get-full-data-status"]: getFullDataStatusRoute,

    ["/v2/get-full"]: getNew,
    ["/v2/request-full"]: requestNew,

    ["/v2/get-iracing-data"]: getIracingData,
    ["/v2/get-race-result"]: getRaceResult,
    ["/v2/search-drivers"]: searchDrivers,

    ["/v2/get-basic-data"]: getBasicData,

    ["/v2/get-avatars"]: getAvatars,

    ["/ws"]: handleWebsocketUpgrade,
  },
  {
    get: (target, name: string) =>
      target[name] || (() => new ClientResponse("Not Found", { status: 404 })),
  }
);
