import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";
import { getSentimentFromEmoji } from "../utils/reactions";

export class MessageReactionAdd extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
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

    if (user.bot || !messageReaction.message.inGuild()) return;

    const sentiment = getSentimentFromEmoji(messageReaction.emoji);
    const score = sentiment * Math.random() * 5;

    await this.container.db.impressions.create({
      data: {
        type: ImpressionType.REACTION,
        discriminator: messageReaction.emoji.name,
        score,
        message: {
          connect: {
            id: messageReaction.message.id,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}
