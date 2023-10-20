import { Events, Listener } from "@sapphire/framework";
import { type MessageReaction, type User } from "discord.js";
import { getEmojiName, getSentimentFromEmoji } from "../utils/reactions";

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
      `Reaction received: ${getEmojiName(messageReaction.emoji)} from ${
        user.username
      }`,
    );

    if (user.bot || !messageReaction.message.inGuild()) return;

    const sentiment = getSentimentFromEmoji(messageReaction.emoji);

    await this.container.db.message.update({
      where: {
        id: messageReaction.message.id,
        createdById: user.id,
      },
      data: {
        score: {
          multiply: sentiment * 1.25 * messageReaction.count ** 0.5,
        },
      },
    });
  }
}
