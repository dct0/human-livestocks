import { PrismaClient } from "@prisma/client";
import { type Decimal } from "@prisma/client/runtime/library";
import { type Message } from "discord.js";

export const prisma = new PrismaClient().$extends({
  name: "customMethods",
  model: {
    member: {
      async getStock(id: string) {
        return prisma.member.findUnique({
          where: {
            id,
          },
          select: {
            stock: true,
            rate: true,
          },
        });
      },
      async updateStock(id: string, rate: Decimal) {
        return prisma.member.update({
          where: {
            id,
          },
          data: {
            stock: {
              increment: rate,
            },
            rate: {
              set: rate,
            },
          },
        });
      },
    },
    message: {
      async createMessage(message: Message, score: number) {
        return prisma.message.create({
          data: {
            id: message.id,
            type: "BEST",
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
                  stock: score,
                },
              },
            },
            guildId: message.guild?.id,
            channelId: message.channel.id,
          },
        });
      },
    },
  },
});

export type ExtendedPrismaClient = typeof prisma;
