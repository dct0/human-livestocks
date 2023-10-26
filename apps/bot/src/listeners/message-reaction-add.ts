import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";
import {
  getEmojiDiscriminator,
  getEmojiName,
  getSentimentFromEmoji,
} from "../utils/reactions";

export class MessageReactionAdd extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageReactionAdd,
    });
  }

  public run(messageReaction: MessageReaction, user: User): void {
    this.container.logger.info(
      `Reaction received: ${getEmojiName(messageReaction.emoji)} from ${
        user.username
      }`,
    );

    if (user.bot || !messageReaction.message.inGuild()) return;

    const sentiment = getSentimentFromEmoji(messageReaction.emoji);
    const emojiDiscriminator = getEmojiDiscriminator(messageReaction.emoji);
    const score = sentiment * Math.random() * 5;

    void this.container.db.impressions.create({
      data: {
        type: ImpressionType.REACTION,
        discriminator: emojiDiscriminator,
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
