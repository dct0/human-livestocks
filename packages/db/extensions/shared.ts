import { Prisma } from "@prisma/client";
import Decimal from "decimal.js";
import { type Message } from "discord.js";

export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: "customMethods",
    model: {
      member: {},
      message: {
        async add(message: Message, baseScore: number) {
          if (!message.guild) throw new Error("Message is not in a guild");

          // move this to a scheduled task in the bot?
          const guild = await client.guild.upsert({
            where: {
              id: message.guild.id,
            },
            create: {
              id: message.guild.id,
              name: message.guild.name,
              iconURL: message.guild.iconURL(),
            },
            update: {
              name: message.guild.name,
              iconURL: message.guild.iconURL(),
            },
          });

          return client.message.create({
            data: {
              id: message.id,
              baseScore,
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
                    user: {
                      connectOrCreate: {
                        where: {
                          id: message.author.id,
                        },
                        create: {
                          id: message.author.id,
                          name: message.author.username,
                        },
                      },
                    },
                    guild: {
                      connect: {
                        id: guild.id,
                      },
                    },
                    stockPrices: {
                      create: {
                        price: 1,
                      },
                    },
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
          return client.stockPrice.findFirst({
            where: {
              memberId,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        },
        async addToMember(memberId: string, price: Decimal) {
          return client.stockPrice.create({
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
        async getByMember(
          memberId: string,
          limit: number,
          orderBy?: Prisma.SortOrder,
        ) {
          // Get 20 most recent messages
          return await client.stockPrice.findMany({
            take: limit,
            orderBy: {
              createdAt: orderBy ?? "desc",
            },
            where: {
              memberId,
            },
          });
        },
      },
    },
  });
});
