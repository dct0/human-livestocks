import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const stocksRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ limit: z.number().default(5) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.stockPrice.getByMember(
        "224445943343218688",
        input.limit,
      );
    }),
});
