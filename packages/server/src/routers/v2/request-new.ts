import { ClientResponse } from "../../response";
import { Server } from "bun";
import { getNewFullData } from "../../iracing/api/new-full-data";
import { getParams } from "../../utils/get-params";
import { getSeasonData } from "../../db/actions/get-season-data";

// TODO: Add handling if season is over and data was fetched after season end
export const requestNew = async (request: Request, server: Server) => {
  const { iracingId, year, season, categoryId } = getParams(request);

  if (!iracingId || !year || !season || !categoryId) {
    return new ClientResponse("missing params", { status: 400 });
  }

  const currentSeasonData = await getSeasonData(
    parseInt(iracingId, 10),
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!currentSeasonData?.isPending) {
    getNewFullData(request, server, currentSeasonData?.id);
    return new ClientResponse(JSON.stringify({ status: "DATA_REQUESTED" }), {
      status: 200,
    });
  }

  return new ClientResponse(JSON.stringify({ status: "ALREADY_REQUESTED" }), {
    status: 200,
  });
};
