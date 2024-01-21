import { clearPendingSeasonData } from "./db/actions/clear-pending-season-data";
import { createServer } from "./server";

const server = createServer();

console.log(`Listening on localhost:${server.port}`);

console.log("Clearing pending season data");
await clearPendingSeasonData();
