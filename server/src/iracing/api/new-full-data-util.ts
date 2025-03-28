import { getLoggedInIracingAPIClient } from "../client";
import { getRaceResult } from "./results";
import { parseResults } from "../parse-results";
import { prisma } from "../../db";
import { upsertSeason } from "../../db/actions/upsert-season";
import { upsertUser } from "../../db/actions/upsert-user";
import type { DriverStats } from "@season-summary/types";

// Track concurrent requests to manage throttling
let currentRequests = 0;

interface Race {
  subsessionId: number;
  finishPositionInClass: number;
  lapsComplete: number;
}

interface Stats {
  races: number;
  wins: number;
  top5: number;
  laps: number;
}

interface SeasonDataParams {
  iracingId: string;
  year: string;
  season: string;
  categoryId: string;
  sendMessage?: (status: string, message: any) => void;
  seasonDataId?: number;
}

interface CountData {
  races: number;
  newRaces: number;
  fetched: number;
}

interface ProgressData {
  count: CountData;
  stats?: Stats;
  data?: DriverStats;
}

interface RaceResult {
  licenseCategoryId: number | string;
  raceSummary?: {
    subsessionId: number;
  };
  [key: string]: any;
}

interface SeasonDataRecord {
  id: number;
  lastRace?: string;
  data?: {
    id?: number;
    json: any;
    stats: Record<string, number>;
    finalIRating: number;
  };
}

/**
 * Calculate timeout based on number of concurrent requests
 * to avoid rate limiting
 */
const getTimeout = (): number => {
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

/**
 * Process a single race result
 */
const processRaceResult = async (
  subsessionId: number,
  categoryId: string
): Promise<RaceResult | null> => {
  const result = await getRaceResult(`${subsessionId}`);

  if (result && result.licenseCategoryId && result.licenseCategoryId.toString() === categoryId) {
    return result as RaceResult;
  }

  return null;
};

/**
 * Update statistics based on race result
 */
const updateStats = (currentStats: Stats, race: Race): Stats => {
  return {
    races: currentStats.races + 1,
    wins: currentStats.wins + (race.finishPositionInClass === 0 ? 1 : 0),
    top5: currentStats.top5 + (race.finishPositionInClass < 5 ? 1 : 0),
    laps: currentStats.laps + race.lapsComplete,
  };
};

/**
 * Handle site maintenance response
 */
const handleSiteMaintenance = async (
  seasonData: SeasonDataRecord,
  sendMessage?: (status: string, message: any) => void
): Promise<void> => {
  await prisma.seasonData.update({
    where: {
      id: seasonData.id,
    },
    data: {
      isPending: false,
    },
  });

  const fullDataJson = seasonData.data && {
    ...(seasonData.data.json as any),
    stats: seasonData.data.stats,
    finalIRating: seasonData.data.finalIRating,
  } as DriverStats;

  const stats = (seasonData.data?.stats ?? {}) as Record<string, number>;
  const data: Stats = {
    races: stats.races ?? 0,
    wins: stats.wins ?? 0,
    top5: stats.top5 ?? 0,
    laps: stats.laps ?? 0,
  };

  sendMessage?.("DONE-MAINTENANCE", { stats: data, data: fullDataJson });
  currentRequests--;
};

/**
 * Handle no races found
 */
const handleNoRaces = async (
  seasonData: SeasonDataRecord,
  sendMessage?: (status: string, message: any) => void
): Promise<void> => {
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
};

/**
 * Fetch and process race data for a user's season
 */
export const getNewFullDataUtil = async ({
  iracingId,
  year,
  season,
  categoryId,
  sendMessage,
  seasonDataId,
}: SeasonDataParams): Promise<void> => {
  try {
    // Validate required parameters
    if (!iracingId || !year || !season || !categoryId) {
      return null;
    }

    currentRequests++;

    console.log("getNewFullData", iracingId, year, season, categoryId);

    // Notify client that we are starting to fetch data
    sendMessage?.("START", "Fetching data");

    // Get or create user and season records
    const { iracingId: userId } = await upsertUser(parseInt(iracingId, 10));
    const { id: seasonId } = await upsertSeason(
      parseInt(year, 10),
      parseInt(season, 10),
      parseInt(categoryId, 10)
    );
    
    // Get or create season data record
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

    // Initialize statistics from existing data
    const currentStats = (seasonData.data?.stats ?? {}) as Record<string, number>;
    let data: Stats = {
      races: currentStats.races ?? 0,
      wins: currentStats.wins ?? 0,
      top5: currentStats.top5 ?? 0,
      laps: currentStats.laps ?? 0,
    };
    
    // Initialize full data from existing data
    let fullDataJson = seasonData.data && {
      ...(seasonData.data.json as any),
      stats: seasonData.data.stats,
      finalIRating: seasonData.data.finalIRating,
    } as DriverStats;

    const ir = await getLoggedInIracingAPIClient();

    // Search for races in the specified season
    const races = await ir.results.searchSeries({
      seasonYear: parseInt(year, 10),
      seasonQuarter: parseInt(season, 10),
      customerId: parseInt(iracingId, 10),
      officialOnly: true,
      eventTypes: [5],
      categoryIds: [parseInt(categoryId, 10)],
    });

    // Handle site maintenance response
    if (races?.error === "Site Maintenance") {
      await handleSiteMaintenance(seasonData, sendMessage);
      return;
    }

    console.log(`Found ${races?.length} races`);

    // Handle no races found
    if (!races?.length) {
      await handleNoRaces(seasonData, sendMessage);
      return;
    }

    // Find new races since last update
    const raceIndex = races.findIndex(
      (r: Race) => `${r.subsessionId}` === seasonData.lastRace
    );
    const newRaces = raceIndex === -1 ? races : races.slice(raceIndex + 1);
    
    sendMessage?.("PROGRESS", {
      count: { races: races.length, newRaces: newRaces.length, fetched: 0 },
    });

    console.log(`Getting ${newRaces.length} new races for`, iracingId);

    let results: Array<RaceResult> = [];

    // Process each race
    for (const race of newRaces) {
      // Try to get the result twice in case of failure
      let r = await processRaceResult(race.subsessionId, categoryId);

      if (!r) {
        r = await processRaceResult(race.subsessionId, categoryId);
      }

      if (r) {
        results.push(r);
      }

      // Update statistics
      data = updateStats(data, race);

      // Update full data
      fullDataJson = parseResults([r], iracingId, fullDataJson);

      // Notify progress
      sendMessage?.("PROGRESS", {
        count: {
          races: races.length,
          newRaces: newRaces.length,
          fetched: results.length,
        },
        stats: data,
        data: fullDataJson,
      });

      // Throttle requests
      const timeout = getTimeout();
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }

    // Extract components for database update
    const { stats, finalIRating, ...json } = fullDataJson || {};

    // Get the ID of the last processed race
    const lastRace =
      results[results.length - 1]?.raceSummary?.subsessionId ??
      seasonData.lastRace;

    // Update season data with results
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

    // Notify completion
    sendMessage?.("DONE", {
      count: {
        races: races.length,
        newRaces: newRaces.length,
        fetched: results.length,
      },
      stats: data,
      data: fullDataJson,
    });
    
    currentRequests--;
  } catch (e) {
    currentRequests--;
    sendMessage?.("ERROR", e);
  }
};
