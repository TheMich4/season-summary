import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import { getFullData } from "./iracing/data/full-data.js";
import { getFullSeasonData } from "./iracing/api/full-data.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("season-summary-api");
});

app.get("/get-full-data", async (req: Request, res: Response) => {
  const { iracingId, year, season, categoryId } = req.query;

  if (!iracingId || !year || !season || !categoryId) {
    res.send({ error: "missing params" });
    return;
  }

  console.log("/get-full-data", { iracingId, year, season, categoryId });

  const fullData = getFullData({
    customerId: iracingId as string,
    year: year as string,
    season: season as string,
    categoryId: categoryId as string,
  });

  if (!fullData) {
    res.send({
      error: "START_FETCHING",
      params: { iracingId, year, season, categoryId },
    });
  }

  if (
    fullData?.isFetched ||
    fullData?.isFetching ||
    fullData?.data?.length === 0
  ) {
    res.send({
      error: null,
      params: { iracingId, year, season, categoryId },
      ...fullData,
    });
    return;
  }

  await getFullSeasonData({
    customerId: iracingId,
    year,
    season,
    categoryId,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
