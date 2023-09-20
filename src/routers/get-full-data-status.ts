import { Request, Response } from "express";

import { getFullSeasonData } from "../iracing/api/full-data.js";
import { getSeasonDataStatus } from "../db/actions/get-season-data-status.js";
import { getSeasonId } from "../db/actions/get-season-id.js";
import { upsertSeason } from "../db/actions/upsert-season.js";

export const getFullDataStatusRoute = async (req: Request, res: Response) => {
  const iracingId = req.query.iracingId as string;
  const year = req.query.year as string;
  const season = req.query.season as string;
  const categoryId = req.query.categoryId as string;

  if (!iracingId || !year || !season || !categoryId) {
    res.send({ error: "missing params" });
    return;
  }

  let seasonId = await getSeasonId(
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!seasonId) {
    const newSeason = await upsertSeason(
      parseInt(year, 10),
      parseInt(season, 10),
      parseInt(categoryId, 10)
    );

    seasonId = newSeason.id;
  }

  const seasonDataStatus = await getSeasonDataStatus(
    parseInt(iracingId),
    seasonId
  );

  res.send({
    error: null,
    params: { iracingId, year, season, categoryId },
    isFetched:
      seasonDataStatus &&
      seasonDataStatus.lastRace &&
      !seasonDataStatus.isPending,
    isFetching: seasonDataStatus.isPending,
  });

  if (!seasonDataStatus.lastRace) {
    await getFullSeasonData({
      customerId: iracingId,
      year,
      season,
      categoryId,
    });
  }
};
