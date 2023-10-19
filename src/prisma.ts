import { WINDOW_SIZE } from "./constants/stocks";
import { calculateNewRate } from "./utils/stocks";

import { PrismaClient } from "@prisma/client";
import { type Decimal } from "@prisma/client/runtime/library";
import { type Message } from "discord.js";

export const prisma = new PrismaClient().$extends({
  name: "customMethods",
  model: {
    member: {},
    message: {
      async add(message: Message, score: number) {
        return prisma.message.create({
          data: {
            id: message.id,
            score,
            content: message.content,
            attachments: message.attachments.map(
              (attachment) => attachment.url,
            ),
            createdBy: {
              connectOrCreate: {
                where: {
                  id: message.author.id,
                },
                create: {
                  id: message.author.id,
                  username: message.author.username,
                },
              },
            },
            guildId: message.guild?.id,
            channelId: message.channel.id,
          },
        });
      },
    },
    stockPrice: {
      async getLatest(memberId: string) {
        return prisma.stockPrice.findFirst({
          where: {
            memberId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
      async addToMember(memberId: string, price: Decimal) {
        return prisma.stockPrice.create({
          data: {
            price,
            member: {
              connect: {
                id: memberId,
              },
            },
          },
        });
      },
      async getNewRate(id: string, score: Decimal) {
        // Get 20 most recent messages
        const stockPrices = await prisma.stockPrice.findMany({
          take: WINDOW_SIZE,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            memberId: id,
          },
        });

        // Calculate the new rate
        return calculateNewRate(stockPrices, score);
      },
    },
  },
});

export type ExtendedPrismaClient = typeof prisma;
