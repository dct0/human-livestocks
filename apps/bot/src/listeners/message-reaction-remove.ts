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

    if (!messageReaction.message.inGuild()) return;

    await this.container.db.$transaction(async (prisma) => {
      // apparently can't nested query by compound key
      const { id: memberId } = await prisma.member.findUniqueOrThrow({
        where: {
          guildId_userId: {
            userId: user.id,
            guildId: messageReaction.message.guild!.id, // eslint-disable-line @typescript-eslint/no-non-null-assertion -- inGuild() ensures this is not null
          },
        },
        select: {
          id: true,
        },
      });

      const impression = await prisma.impression.delete({
        where: {
          discriminator_messageId_createdById_type: {
            createdById: memberId,
            discriminator:
              messageReaction.emoji.name ?? messageReaction.emoji.identifier,
            messageId: messageReaction.message.id,
            type: ImpressionType.REACTION,
          },
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
