import { ClientResponse } from "../../response";
import { getLoggedInIracingAPIClient } from "../../iracing/client";
import { getPreviousSeason } from "../../utils/get-previous-season";

export const getBasicData = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const iracingId = searchParams.get("iracingId");
  // const categoryId = searchParams.get("categoryId");

  if (!iracingId) {
    return new ClientResponse("missing params", { status: 400 });
  }

  const ir = await getLoggedInIracingAPIClient();

  const currentSeason = [
    +process.env.CURRENT_YEAR!,
    +process.env.CURRENT_SEASON!,
  ];

  const previousSeason = getPreviousSeason(...currentSeason);

  const [memberRecap, previousMemberRecap] = await Promise.all([
    ir.stats.getMemberRecap({
      customerId: +iracingId,
      year: +process.env.CURRENT_YEAR!,
      season: +process.env.CURRENT_SEASON!,
    }),
    ir.stats.getMemberRecap({
      customerId: +iracingId,
      year: previousSeason.year,
      season: previousSeason.season,
    }),
  ]);

  console.log({ memberRecap, previousMemberRecap });

  if (!memberRecap) {
    return new ClientResponse("member not found", { status: 404 });
  }

  if ((memberRecap as any).error) {
    return new ClientResponse("iracing-maintenance", { status: 503 });
  }

  return new ClientResponse(
    JSON.stringify({
      current: {
        wins: memberRecap?.stats?.wins ?? 0,
        starts: memberRecap?.stats?.starts ?? 0,
        top5: memberRecap?.stats?.top5 ?? 0,
        laps: memberRecap?.stats?.laps ?? 0,
        avgStartPosition: memberRecap?.stats?.avgStartPosition ?? 0,
        avgFinishPosition: memberRecap?.stats?.avgFinishPosition ?? 0,
      },
      previous: {
        wins: previousMemberRecap?.stats?.wins ?? 0,
        starts: previousMemberRecap?.stats?.starts ?? 0,
        top5: previousMemberRecap?.stats?.top5 ?? 0,
        laps: previousMemberRecap?.stats?.laps ?? 0,
        avgStartPosition: previousMemberRecap?.stats?.avgStartPosition ?? 0,
        avgFinishPosition: previousMemberRecap?.stats?.avgFinishPosition ?? 0,
      },
    }),
    {
      status: 200,
    }
  );
};
