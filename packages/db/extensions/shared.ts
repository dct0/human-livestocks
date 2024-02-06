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

          const user = await client.user.upsert({
            where: {
              id: message.author.id,
            },
            create: {
              id: message.author.id,
              name: message.author.username,
              image:
                message.author.avatarURL() ?? message.author.defaultAvatarURL,
            },
            update: {
              name: message.author.username,
              image:
                message.author.avatarURL() ?? message.author.defaultAvatarURL,
            },
          });

          const member = await client.member.upsert({
            where: {
              guildId_userId: {
                guildId: guild.id,
                userId: user.id,
              },
            },
            create: {
              userId: user.id,
              guildId: guild.id,
              stockPrices: {
                create: {
                  price: 1,
                },
              },
            },
            update: {
              user: {
                connect: {
                  id: message.author.id,
                },
              },
            },
          });

          return client.message.create({
            data: {
              id: message.id,
              baseScore,
              calculatedScore: baseScore,
              content: message.content,
              attachments: message.attachments.map(
                (attachment) => attachment.url,
              ),
              createdBy: {
                connect: {
                  id: member.id,
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
      },
    },
  });
});
