import { routeHandler } from "./route-handler";

const server = Bun.serve({
  port: process.env.PORT,
  fetch(request, response) {
    const url = new URL(request.url);

    return routeHandler[url.pathname](request, response);
  },
});

console.log(`Listening on localhost:${server.port}`);
