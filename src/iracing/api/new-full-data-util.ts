import { getLoggedInIracingAPIClient } from "../client";
import { getRaceResult } from "./results";
import { parseResults } from "../parse-results";
import { prisma } from "../../db";
import { upsertSeason } from "../../db/actions/upsert-season";
import { upsertUser } from "../../db/actions/upsert-user";

let currentRequests = 0;

// TODO: Improve this to calculate timeout based on currentRequests
const getTimeout = () => {
  if (currentRequests >= 10) {
    return 5000;
  }

  if (currentRequests >= 5) {
    return 2000;
  }

  if (currentRequests >= 3) {
    return 1000;
  }

  return +process.env.DEFAULT_FETCH_INTERVAL! || 100;
};

export const getNewFullDataUtil = async ({
  iracingId,
  year,
  season,
  categoryId,
  sendMessage,
  seasonDataId,
}: {
  iracingId: string;
  year: string;
  season: string;
  categoryId: string;
  sendMessage?: (status: string, message: any) => void;
  seasonDataId?: number;
}) => {
  try {
    if (!iracingId || !year || !season || !categoryId) {
      return null;
    }

    currentRequests++;

    console.log("getNewFullData", iracingId, year, season, categoryId);

    // Notify client that we are starting to fetch data
    sendMessage?.("START", "Fetching data");

    // TODO: Refactor
    const { iracingId: userId } = await upsertUser(parseInt(iracingId, 10));
    const { id: seasonId } = await upsertSeason(
      parseInt(year, 10),
      parseInt(season, 10),
      parseInt(categoryId, 10)
    );
    const seasonData = await prisma.seasonData.upsert({
      where: {
        id: seasonDataId,
        seasonId_userId: {
          seasonId,
          userId,
        },
      },
      create: {
        isPending: true,
        userId,
        seasonId,
      },
      update: {
        isPending: true,
      },
      include: {
        data: true,
      },
    });

    const ir = await getLoggedInIracingAPIClient();

    const races = await ir.results.searchSeries({
      seasonYear: parseInt(year, 10),
      seasonQuarter: parseInt(season, 10),
      customerId: parseInt(iracingId, 10),
      officialOnly: true,
      eventTypes: [5],
      categoryIds: [parseInt(categoryId, 10)],
    });

    console.log(`Found ${races?.length} races`);

    if (!races?.length) {
      await prisma.seasonData.update({
        where: {
          id: seasonData.id,
        },
        data: {
          isPending: false,
          data: undefined,
        },
      });

      sendMessage?.("DONE", {
        count: { races: 0, newRaces: 0, fetched: 0 },
      });
      currentRequests--;
      return;
    }

    const raceIndex = races.findIndex(
      (r) => `${r.subsessionId}` === seasonData.lastRace
    );
    const newRaces = raceIndex === -1 ? races : races.slice(raceIndex + 1);
    sendMessage?.("PROGRESS", {
      count: { races: races.length, newRaces: newRaces.length, fetched: 0 },
    });

    console.log(`Getting ${newRaces.length} new races for`, iracingId);

    let results: Array<any> = [];

    const getResult = async (subsessionId: number) => {
      const result: any = await getRaceResult(`${subsessionId}`);

      if (result && result.track.categoryId?.toString() === categoryId) {
        results.push(result);
      }

      const timeout = getTimeout();

      await new Promise((resolve) => setTimeout(resolve, timeout));

      return result;
    };

    // TODO: Temporary try second time
    for (const race of newRaces) {
      const r = await getResult(race.subsessionId);

      if (!r) {
        await getResult(race.subsessionId);
      }

      sendMessage?.("PROGRESS", {
        count: {
          races: races.length,
          newRaces: newRaces.length,
          fetched: results.length,
        },
      });
    }

    const fullDataJson = seasonData.data && {
      ...(seasonData.data.json as any),
      stats: seasonData.data.stats,
      finalIRating: seasonData.data.finalIRating,
    };

    const { stats, finalIRating, ...json } = parseResults(
      results,
      iracingId,
      fullDataJson
    );

    const lastRace =
      results[results.length - 1]?.raceSummary.subsessionId ??
      seasonData.lastRace;

    await prisma.seasonData.update({
      where: {
        id: seasonData.id,
      },
      data: {
        isPending: false,
        data: {
          upsert: {
            where: {
              id: seasonData.data?.id,
            },
            create: {
              finalIRating,
              json,
              stats,
            },
            update: {
              finalIRating,
              json,
              stats,
            },
          },
        },
        lastRace: lastRace && `${lastRace}`,
      },
    });

    sendMessage?.("DONE", {
      count: {
        races: races.length,
        newRaces: newRaces.length,
        fetched: results.length,
      },
    });
    currentRequests--;
  } catch (e) {
    currentRequests--;
    sendMessage?.("ERROR", e);
  }
};
