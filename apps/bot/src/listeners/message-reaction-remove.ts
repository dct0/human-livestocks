import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";
import { getEmojiDiscriminator, getEmojiName } from "../utils/reactions";

export class MessageReactionRemove extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageReactionRemove,
    });
  }

  public run(messageReaction: MessageReaction, user: User): void {
    this.container.logger.info(
      `Reaction removed: ${getEmojiName(messageReaction.emoji)} from ${
        user.username
      }`,
    );

    if (user.bot || !messageReaction.message.inGuild()) return;

    // This should only ever delete one
    void this.container.db.impressions.deleteMany({
      where: {
        type: ImpressionType.REACTION,
        discriminator: getEmojiDiscriminator(messageReaction.emoji),
        createdBy: {
          id: user.id,
        },
        message: { id: messageReaction.message.id },
      },
    });
  }
}
