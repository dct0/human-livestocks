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
          member: {
            userId: ctx.session.user.id,
          },
        },
      });
    }),
  getTop: protectedProcedure
    .input(
      z.object({
        numMembers: z.number().min(0).max(10).default(5),
        limit: z.number().min(0).max(100).default(20),
        orderBy: z
          .enum(zodEnum<Prisma.SortOrder>(["asc", "desc"]))
          .default("desc"),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.member.findMany({
        take: input.numMembers,
        orderBy: {
          currentPrice: "desc",
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          stockPrices: {
            take: input.limit,
            orderBy: {
              createdAt: input.orderBy,
            },
          },
        },
      });
    }),
});
