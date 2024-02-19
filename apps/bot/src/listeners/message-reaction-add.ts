import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";
import { randomBetween } from "../utils/random";
import { getSentimentFromEmoji } from "../utils/reactions";

export class MessageReactionAdd extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: Events.MessageReactionAdd,
    });
  }

  public async run(
    messageReaction: MessageReaction,
    user: User,
  ): Promise<void> {
    this.container.logger.info(
      `Reaction received: ${messageReaction.emoji.name} from ${user.username}`,
    );

    if (!messageReaction.message.inGuild()) return;

    const sentiment = getSentimentFromEmoji(messageReaction.emoji);
    const score = sentiment * randomBetween(5, 7);
    await this.container.db.$transaction(async (prisma) => {
      await Promise.all([
        prisma.impression.create({
          data: {
            type: ImpressionType.REACTION,
            discriminator:
              messageReaction.emoji.name ?? messageReaction.emoji.identifier,
            score,
            message: {
              connect: {
                id: messageReaction.message.id,
              },
            },
            createdBy: {
              connect: {
                guildId_userId: {
                  userId: user.id,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- inGuild() ensures this is not null
                  guildId: messageReaction.message.guild!.id,
                },
              },
            },
          },
        }),
        prisma.message.update({
          where: {
            id: messageReaction.message.id,
          },
          data: {
            calculatedScore: {
              increment: score, // Simple increment
            },
          },
        }),
      ]);
    });
  }
}
