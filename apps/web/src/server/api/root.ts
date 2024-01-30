import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { stockRouter } from "./routers/stock";
import { guildRouter } from "./routers/guild";
import { messageRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  guild: guildRouter,
  post: postRouter,
  stock: stockRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
