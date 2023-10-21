import { prisma } from "db";
import { publicProcedure, router } from "./trpc";

export const createTRPCContext = (): object => ({
  db: prisma,
});

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello world!";
  }),
});

export const serverClient = appRouter.createCaller(createTRPCContext);

export type AppRouter = typeof appRouter;
