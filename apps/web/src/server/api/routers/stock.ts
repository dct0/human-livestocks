import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const stockRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ limit: z.number().min(0).max(100).default(20) }))
    .query(({ ctx, input }) => {
      return ctx.db.stockPrice.getByMember(ctx.session.user.id, input.limit);
    }),
});
