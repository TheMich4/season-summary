import { getLoggedInIracingAPIClient } from "../client";
import { getRaceResult } from "./results";
import { parseResults } from "../parse-results";
import { prisma } from "../../db";
import { upsertSeason } from "../../db/actions/upsert-season";
import { upsertUser } from "../../db/actions/upsert-user";

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
    });

    const ir = await getLoggedInIracingAPIClient();

    const races = await ir.searchSeries({
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
        races: 0,
        newRaces: 0,
        fetched: 0,
      });
      return;
    }

    const raceIndex = races.findIndex(
      (r) => `${r.subsessionId}` === seasonData.lastRace
    );
    const newRaces = raceIndex === -1 ? races : races.slice(raceIndex + 1);
    sendMessage?.("PROGRESS", {
      races: races.length,
      newRaces: newRaces.length,
      fetched: 0,
    });

    console.log(`Getting ${newRaces.length} new races for`, iracingId);

    let results: Array<any> = [];

    const getResult = async (subsessionId: number) => {
      const result: any = await getRaceResult(`${subsessionId}`);

      if (result && result.track.categoryId?.toString() === categoryId) {
        results.push(result);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, +process.env.FETCH_INTERVAL! || 3000)
      );

      return result;
    };

    // TODO: Temporary try second time
    for (const race of newRaces) {
      const r = await getResult(race.subsessionId);

      if (!r) {
        await getResult(race.subsessionId);
      }

      sendMessage?.("PROGRESS", {
        races: races.length,
        newRaces: newRaces.length,
        fetched: results.length,
      });
    }

    const data = parseResults(results, iracingId, seasonData.data);
    const lastRace =
      results[results.length - 1]?.raceSummary.subsessionId ??
      seasonData.lastRace;

    await prisma.seasonData.update({
      where: {
        id: seasonData.id,
      },
      data: {
        isPending: false,
        data,
        lastRace: lastRace && `${lastRace}`,
      },
    });

    sendMessage?.("DONE", {
      races: races.length,
      newRaces: newRaces.length,
      fetched: results.length,
    });
  } catch (e) {
    sendMessage?.("ERROR", e);
  }
};
