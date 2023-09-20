import { Request, Response } from "express";

// import { getFullData } from "../iracing/data/full-data.js";
import { getFullSeasonData } from "../iracing/api/full-data.js";
import { getSeasonData } from "../db/actions/get-season-data.js";
import { upsertSeason } from "../db/actions/upsert-season.js";

export const getFullDataRoute = async (req: Request, res: Response) => {
  const iracingId = req.query.iracingId as string;
  const year = req.query.year as string;
  const season = req.query.season as string;
  const categoryId = req.query.categoryId as string;

  if (!iracingId || !year || !season || !categoryId) {
    res.send({ error: "missing params" });
    return;
  }

  console.log("/get-full-data", { iracingId, year, season, categoryId });

  const fullData = await getSeasonData(
    parseInt(iracingId, 10),
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!fullData) {
    res.send({
      error: "START_FETCHING",
      params: { iracingId, year, season, categoryId },
    });
  }

  if (fullData?.isPending || fullData?.lastRace || fullData?.data) {
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
};
