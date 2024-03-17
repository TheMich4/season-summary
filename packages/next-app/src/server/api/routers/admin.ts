import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getSummary: protectedProcedure.query(async ({ ctx }) => {
    const userCount = await ctx.db.user.count({
      select: {
        emailVerified: true,
        favoriteCategory: true,
        preferFull: true,
        isAdmin: true,
        iracingId: true,
        _all: true,
      },
    });

    return { userCount };
  }),
});
