import { Category, categoryToId } from "@/config/category";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "process";
import { z } from "zod";

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
});
