import { ClientResponse } from "../response.js";
import { getFullSeasonData } from "../iracing/api/full-data.js";
import { getSeasonDataStatus } from "../db/actions/get-season-data-status.js";
import { getSeasonId } from "../db/actions/get-season-id.js";
import { upsertSeason } from "../db/actions/upsert-season.js";

export const getFullDataStatusRoute = async (request) => {
  const { searchParams } = new URL(request.url);

  const iracingId = searchParams.get("iracingId");
  const year = searchParams.get("year");
  const season = searchParams.get("season");
  const categoryId = searchParams.get("categoryId");

  if (!iracingId || !year || !season || !categoryId) {
    return new ClientResponse("missing params", { status: 400 });
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

  getFullSeasonData({
    customerId: iracingId,
    year,
    season,
    categoryId,
  });

  return new ClientResponse(
    JSON.stringify({
      error: null,
      params: { iracingId, year, season, categoryId },
      isFetched:
        seasonDataStatus &&
        seasonDataStatus.lastRace &&
        !seasonDataStatus.isPending,
      isFetching: seasonDataStatus.isPending,
    }),
    { status: 200 }
  );
};
