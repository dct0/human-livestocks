import { zodEnum } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Prisma } from "db";
import { z } from "zod";

export const stockRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(0).max(100).default(20),
        orderBy: z
          .enum(zodEnum<Prisma.SortOrder>(["asc", "desc"]))
          .default("desc"),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.stockPrice.findMany({
        take: input.limit,
        orderBy: {
          createdAt: input.orderBy,
        },
        where: {
          memberId: ctx.session.user.id,
        },
      });
    }),
});
