import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";

export class MessageReactionRemove extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageReactionRemove,
    });
  }

  public async run(
    messageReaction: MessageReaction,
    user: User,
  ): Promise<void> {
    this.container.logger.info(
      `Reaction removed: ${messageReaction.emoji.name} from ${user.username}`,
    );

    if (user.bot || !messageReaction.message.inGuild()) return;

    // This should only ever delete one
    await this.container.db.impression.deleteMany({
      where: {
        type: ImpressionType.REACTION,
        discriminator: messageReaction.emoji.name,
        createdBy: {
          userId: user.id,
        },
        message: { id: messageReaction.message.id },
      },
    });
  }
}
