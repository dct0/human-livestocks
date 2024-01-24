import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const guildRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.guild.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
