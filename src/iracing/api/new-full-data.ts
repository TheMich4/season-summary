import { Server } from "bun";
import { getLoggedInIracingAPIClient } from "../client";
import { getParams } from "../../utils/get-params";
import { getRaceResult } from "./results";
import { getWSChannelFromData } from "../../utils/get-ws-channel";
import { parseResults } from "../parse-results";
import { prisma } from "../../db";
import { upsertSeason } from "../../db/actions/upsert-season";
import { upsertUser } from "../../db/actions/upsert-user";

const sendMessage = (
  request: Request,
  server: Server,
  status: string,
  message: any
) => {
  const params = getParams(request);
  const channel = getWSChannelFromData(params);
  channel && server.publish(channel, JSON.stringify({ status, message }));
};

export const getNewFullData = async (
  request: Request,
  server: Server,
  seasonDataId: number | undefined
) => {
  try {
    const { iracingId, year, season, categoryId } = getParams(request);

    if (!iracingId || !year || !season || !categoryId) {
      return null;
    }

    console.log("getNewFullData", iracingId, year, season, categoryId);

    // Notify client that we are starting to fetch data
    sendMessage(request, server, "START", "Fetching data");

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
      sendMessage(request, server, "DONE", {
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
    sendMessage(request, server, "PROGRESS", {
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

      await new Promise((resolve) => setTimeout(resolve, 3000));

      return result;
    };

    // TODO: Temporary try second time
    for (const race of newRaces) {
      const r = await getResult(race.subsessionId);

      if (!r) {
        await getResult(race.subsessionId);
      }

      sendMessage(request, server, "PROGRESS", {
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

    sendMessage(request, server, "DONE", {
      races: races.length,
      newRaces: newRaces.length,
      fetched: results.length,
    });
  } catch (e) {
    sendMessage(request, server, "ERROR", e);
  }
};
