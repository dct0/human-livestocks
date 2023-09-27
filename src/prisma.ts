import { REVERSION_FACTOR, WINDOW_SIZE } from "./constants/stocks";
import { calculateBias } from "./utils/stocks";

import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { type Message } from "discord.js";

export const prisma = new PrismaClient().$extends({
  name: "customMethods",
  model: {
    member: {
      async calculateNewRate(id: string, score: Decimal) {
        // Get 20 most recent messages
        const messages = await prisma.message.findMany({
          take: WINDOW_SIZE,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            score: true,
          },
        });

        // Average the scores
        const average = messages
          .reduce((acc, curr) => acc.add(curr.score), new Decimal(0))
          .div(WINDOW_SIZE);

        const deviation = average.sub(score);

        const reversionAmount = deviation.mul(REVERSION_FACTOR);
        const biasAmount = calculateBias(score, deviation);

        const newRate = reversionAmount.add(biasAmount);

        // Calculate the new rate
        return newRate;
      },
    },
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
    },
  },
});

export type ExtendedPrismaClient = typeof prisma;
