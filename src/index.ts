import { clearPendingSeasonData } from "./db/actions/clear-pending-season-data";
import { createServer } from "./server";

console.log("Clearing pending season data before starting server");
await clearPendingSeasonData();

const server = createServer();

console.log(`Listening on localhost:${server.port}`);
