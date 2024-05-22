import { ClientResponse } from "../../response";
import { Server } from "bun";
import { getParams } from "../../utils/get-params";
import { getSeasonData } from "../../db/actions/get-season-data";

export const getNew = async (request: Request, server: Server) => {
  const { iracingId, year, season, categoryId } = getParams(request);

  if (!iracingId || !year || !season || !categoryId) {
    return new ClientResponse("missing params", { status: 400 });
  }

  const seasonData = await getSeasonData(
    parseInt(iracingId, 10),
    parseInt(year, 10),
    parseInt(season, 10),
    parseInt(categoryId, 10)
  );

  if (!seasonData) {
    return new ClientResponse(JSON.stringify({ status: "NOT_FOUND" }), {
      status: 200,
    });
  }

  if (seasonData?.isPending) {
    return new ClientResponse(JSON.stringify({ status: "PENDING" }), {
      status: 200,
    });
  }

  return new ClientResponse(
    JSON.stringify({
      data: seasonData.data && {
        ...(seasonData.data.json as any),
        stats: seasonData.data.stats,
      },
      status: "DONE",
    }),
    {
      status: 200,
    }
  );
};
