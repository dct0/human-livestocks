import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(0).max(100).default(10),
        sentiment: z.enum(["positive", "negative"]).default("positive"),
        own: z.boolean(),
        guildId: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          guildId: input.guildId,
          // createdAt less than a week ago
          createdBy: input.own ? { userId: ctx.session.user.id } : undefined,
          createdAt: { gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        orderBy: [
          {
            calculatedScore: input.sentiment === "positive" ? "desc" : "asc",
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
