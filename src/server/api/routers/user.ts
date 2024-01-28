import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { isAdmin: true },
    });

    return (data?.isAdmin as boolean) ?? false;
  }),
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      select: {
        iracingId: true,
        preferFull: true,
        favoriteCategory: true,
      },
    });
  }),
});
