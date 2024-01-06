import { prisma } from "../db";
import { getDataToRegenerate } from "./get-data-to-regenerate";
import { regenerateSeasonData } from "./regenerate-season-data";

console.log("Getting data to regenerate...");
const data = await getDataToRegenerate();

// const file = Bun.file("src/maintenance/data/season-data.json");
// const data = await file.json();

const filePath = `./data/season-data.json`;
const filePath2 = `./data/season-data-${new Date().toISOString()}.json`;

console.log(`Writing data to file (${filePath})...`);
await Bun.write(filePath, JSON.stringify(data, null, 2));

console.log(`Writing data to file (${filePath2})...`);
await Bun.write(filePath2, JSON.stringify(data, null, 2));

console.log("Cleaning season data");
await prisma.seasonData.deleteMany();

await regenerateSeasonData(data);
