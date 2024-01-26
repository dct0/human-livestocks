import { env } from "@/env.mjs";
import { PrismaClient } from "db";
import sharedMethods from "db/extensions/shared";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  }).$extends(sharedMethods);
};

export type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
