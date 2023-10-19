import { PrismaClient } from "@prisma/client";
import { type Decimal } from "@prisma/client/runtime/library";
import { type Message } from "discord.js/typings";

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
              (attachment) => attachment.url
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
      async getByMember(id: string, limit: number) {
        // Get 20 most recent messages
        return await prisma.stockPrice.findMany({
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            memberId: id,
          },
        });
      },
    },
  },
});

export type ExtendedPrismaClient = typeof prisma;
export * from "@prisma/client";