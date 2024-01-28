import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

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
  updateAvatar: protectedProcedure
    .input(z.object({ avatarUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { image: input.avatarUrl },
      });
    }),
  setConfig: protectedProcedure
    .input(
      z.object({
        iracingId: z.string(),
        preferFull: z.boolean(),
        favoriteCategory: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          iracingId: input.iracingId ? input.iracingId : null,
          preferFull: input.preferFull,
          favoriteCategory: input.favoriteCategory,
        },
      });
    }),
});
