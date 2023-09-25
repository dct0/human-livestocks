import { MessageType } from "@prisma/client";
import { Events, Listener } from "@sapphire/framework";
import { type Message } from "discord.js";

export class MessageCreateListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public async run(message: Message) {
    this.container.logger.info(`Message received: ${message.content}`);
    await this.container.database.message.create({
      data: {
        id: message.id,
        type: MessageType.BEST,
        score: 0,
        content: message.content,
        attachments: message.attachments.map((attachment) => attachment.url),
        createdBy: {
          connectOrCreate: {
            where: {
              id: message.author.id,
            },
            create: {
              id: message.author.id,
              username: message.author.username,
            },
          },
        },
      },
    });
    void message.react("👍");
  }
}
