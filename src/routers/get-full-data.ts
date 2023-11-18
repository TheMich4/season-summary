// import { getFullData } from "../iracing/data/full-data.js";
import { getFullSeasonData } from "../iracing/api/full-data.js";
import { getSeasonData } from "../db/actions/get-season-data.js";
import { upsertSeason } from "../db/actions/upsert-season.js";

export const getFullDataRoute = async (request) => {
  const { searchParams } = new URL(request.url);

  const iracingId = searchParams.get("iracingId");
  const year = searchParams.get("year");
  const season = searchParams.get("season");
  const categoryId = searchParams.get("categoryId");

  if (!iracingId || !year || !season || !categoryId) {
    return new Response("missing params", { status: 400 });
  }

  console.log("/get-full-data", { iracingId, year, season, categoryId });

  const fullData = await getSeasonData(
    parseInt(iracingId, 10),
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!fullData) {
    getFullSeasonData({
      customerId: iracingId,
      year,
      season,
      categoryId,
    });

    return new Response(
      JSON.stringify({
        error: "START_FETCHING",
        params: { iracingId, year, season, categoryId },
      })
    );
  }

  if (fullData?.isPending || fullData?.lastRace || fullData?.data) {
    return new Response(
      JSON.stringify({
        error: null,
        params: { iracingId, year, season, categoryId },
        ...fullData,
      }),
      { status: 200 }
    );
  }
};
