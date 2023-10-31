import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const stocksRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.stockPrice.getByMember(
        ctx.session.user.id,
        input.limit,
      );
    }),
});
