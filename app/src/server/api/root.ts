import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { dataRouter } from "./routers/data";
import { raceDataRouter } from "./routers/race-data";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  data: dataRouter,
  raceData: raceDataRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
