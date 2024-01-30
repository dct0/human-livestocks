import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(0).max(100).default(10),
        sentiment: z.enum(["positive", "negative"]).default("positive"),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          // createdAt less than a week ago
          createdAt: { gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        orderBy: [
          {
            impressions: {
              _count: input.sentiment === "positive" ? "desc" : "asc", // TODO: use the calculated score
            },
          },
          {
            baseScore: input.sentiment === "positive" ? "desc" : "asc", // TODO: use the calculated score
          },
          {
            createdAt: "desc",
          },
        ],
        take: input.limit,
        skip: input.limit * (input.page - 1),
        include: {
          createdBy: {
            include: {
              user: true,
            },
          },
          impressions: true,
        },
      });
    }),
});
