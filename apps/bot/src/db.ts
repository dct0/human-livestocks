import { PrismaClient } from "db";
import sharedMethods from "db/extensions/shared";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- type is dynamic
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  }).$extends(sharedMethods);
};

export type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
