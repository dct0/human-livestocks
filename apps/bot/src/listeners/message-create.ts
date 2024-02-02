import { Events, Listener } from "@sapphire/framework";
import { type Message } from "discord.js";

export class MessageCreateListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public async run(message: Message): Promise<void> {
    this.container.logger.info(
      `Message received (${message.id}): ${message.content}`,
    );

    if (!message.inGuild()) return; // whitelist bots later

    const score = Math.random() * 6 - 2; // Score of the message is between -2 and 4

    await this.container.db.message.add(message, score);
  }
}
