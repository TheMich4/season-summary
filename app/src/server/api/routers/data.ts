// TODO: Fix those
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import type { Category } from "@season-summary/config";
import { categoryToId } from "@season-summary/config";
import { env } from "process";
import { z } from "zod";

const omit = (obj: Record<string, any> | undefined, keys: string[]) => {
  if (!obj) return obj;

  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

export const dataRouter = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        iracingId: z.string(),
        year: z.number(),
        season: z.number(),
        category: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const categoryId = categoryToId[input.category as Category];
        const response = await fetch(
          `${env.API_URL}v2/get-iracing-data?iracingId=${input.iracingId}&year=${input.year}&season=${input.season}&categoryId=${categoryId}`,
        );
        return await response.json();
      } catch (err) {
        return undefined;
      }
    }),
  getRaceResult: publicProcedure
    .input(z.object({ subsessionId: z.string().or(z.number()) }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `${env.API_URL}v2/get-race-result?subsessionId=${input.subsessionId}`,
        );
        const { data } = await response.json();

        return data;
      } catch (err) {
        return undefined;
      }
    }),
  userSearch: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const response = await fetch(
        `${env.API_URL}v2/search-drivers?searchTerm=${input}`,
      );
      const { drivers } = await response.json();

      return drivers;
    } catch (err) {
      return undefined;
    }
  }),
  getDriverSeasons: publicProcedure
    .input(z.object({ iracingId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const seasonData = await ctx.db.seasonData.findMany({
          where: { userId: +input.iracingId },
          select: {
            id: true,
            seasonId: true,
          },
        });

        const seasons = await ctx.db.season.findMany({
          where: {
            id: {
              in: seasonData.map((season) => season.seasonId),
            },
          },
          select: {
            id: true,
            season: true,
            year: true,
            category: true,
          },
        });

        const data = await ctx.db.data.findMany({
          where: {
            seasonDataId: {
              in: seasonData.map((season) => season.id),
            },
          },
          select: {
            seasonDataId: true,
            finalIRating: true,
            stats: true,
          },
        });

        const parsedData = seasonData.map((sd) => {
          const season = seasons.find((s) => s.id === sd.seasonId) as Record<
            string,
            any
          >;
          const d = data.find((d) => d.seasonDataId === sd.id) as Record<
            string,
            any
          >;

          return {
            season: omit(season, ["id"]) as Record<string, any>,
            data: omit(d, ["seasonDataId"]),
          };
        });

        const grouped = parsedData.reduce(
          (acc, curr) => {
            const { season, data } = curr;
            const key = `${season.season}-${season.year}`;
            const category = categoryToId[season.category as Category];

            if (!category) return acc;

            return {
              ...acc,
              [key]: {
                ...acc[key],
                [category]: data,
              },
            };
          },
          {} as Record<string, any>,
        );

        return Object.values(grouped).sort((a, b) => {
          if (a.season.year > b.season.year) return -1;
          if (a.season.year < b.season.year) return 1;
          if (a.season.season > b.season.season) return -1;
          if (a.season.season < b.season.season) return 1;
          return 0;
        });
      } catch (err) {
        return undefined;
      }
    }),
});
