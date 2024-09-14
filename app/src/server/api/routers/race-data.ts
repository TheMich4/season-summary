import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { env } from "process";
import { z } from "zod";

export const raceDataRouter = createTRPCRouter({
  getDriverRaceLaps: publicProcedure
    .input(
      z.object({
        customerId: z.string().or(z.number()),
        simsessionNumber: z.string().or(z.number()),
        subsessionId: z.string().or(z.number()),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `${env.API_URL}v2/get-race-lap-data?subsessionId=${input.subsessionId}&simsessionNumber=${input.simsessionNumber}&customerId=${input.customerId}`,
        );
        const { data } = await response.json();

        return data;
      } catch (err) {
        return undefined;
      }
    }),
});
