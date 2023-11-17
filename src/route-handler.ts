import { getFullDataRoute } from "./routers/get-full-data";
import { getFullDataStatusRoute } from "./routers/get-full-data-status";

export const routeHandler = new Proxy(
  {
    ["/"]: () => new Response("Hello World!", { status: 200 }),
    ["/get-full-data"]: getFullDataRoute,
    ["/get-full-data-status"]: getFullDataStatusRoute,
  },
  {
    get: (target, name: string) =>
      target[name] || (() => new Response("Not Found", { status: 404 })),
  }
);
