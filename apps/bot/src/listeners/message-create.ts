import { Events, Listener } from "@sapphire/framework";
import { type Message } from "discord.js";

export class MessageCreateListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public run(message: Message): void {
    this.container.logger.info(`Message received: ${message.content}`);

    if (!message.inGuild()) return;

    const score = Math.random() * 6 - 3; // Score of the message is between -3 and 3

    void this.container.db.message.add(message, score);
  }
}
