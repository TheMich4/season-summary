import express, { Express, Request, Response } from "express";
import {
  getFullData,
  isFullDataFetched,
  isFullDataFetching,
} from "./iracing/data/full-data.js";

import dotenv from "dotenv";
import { getFullSeasonData } from "./iracing/api/full-data.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("season-summary-api");
});

app.get("/get-full-data", async (req: Request, res: Response) => {
  const iracingId = req.query.iracingId as string;
  const year = req.query.year as string;
  const season = req.query.season as string;
  const categoryId = req.query.categoryId as string;

  if (!iracingId || !year || !season || !categoryId) {
    res.send({ error: "missing params" });
    return;
  }

  console.log("/get-full-data", { iracingId, year, season, categoryId });

  const fullData = getFullData({
    customerId: iracingId,
    year: year,
    season: season,
    categoryId: categoryId,
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

app.get("/get-full-data-status", (req: Request, res: Response) => {
  const iracingId = req.query.iracingId as string;
  const year = req.query.year as string;
  const season = req.query.season as string;
  const categoryId = req.query.categoryId as string;

  if (!iracingId || !year || !season || !categoryId) {
    res.send({ error: "missing params" });
    return;
  }

  const isFetched = isFullDataFetched({
    customerId: iracingId,
    year: year,
    season: season,
    categoryId: categoryId,
  });

  const isFetching = isFullDataFetching({
    customerId: iracingId,
    year: year,
    season: season,
    categoryId: categoryId,
  });

  res.send({
    error: null,
    params: { iracingId, year, season, categoryId },
    isFetched,
    isFetching,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
