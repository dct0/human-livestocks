import { Events, Listener } from "@sapphire/framework";
import { ImpressionType } from "db";
import { type MessageReaction, type User } from "discord.js";

export class MessageReactionRemove extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
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

    await this.container.db.$transaction(async (prisma) => {
      const impression = await prisma.impression.delete({
        where: {
          discriminator_messageId_createdById_type: {
            discriminator:
              messageReaction.emoji.name ?? messageReaction.emoji.identifier,
            messageId: messageReaction.message.id,
            createdById: user.id,
            type: ImpressionType.REACTION,
          },
        },
        select: {
          score: true,
        },
      });

      await prisma.message.update({
        where: {
          id: messageReaction.message.id,
        },
        data: {
          calculatedScore: {
            decrement: impression.score, // Simple decrement
          },
        },
      });
    });
  }
}
