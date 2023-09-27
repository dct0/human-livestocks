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

    if (!message.inGuild()) return;

    const memberStock = await this.container.db.member.getStock(
      message.author.id,
    );

    // TODO: conduct some analysis on the message to determine the score
    const score = Math.random() * 10 - 5; // Score of the message is between -5 and 5

    if (memberStock) {
      const newRate = memberStock.rate.add(score * 0.1);

      await this.container.db.member.updateStock(message.author.id, newRate);
    }

    void this.container.db.message.createMessage(message, score);
  }
}
