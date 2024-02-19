import { Events, Listener } from "@sapphire/framework";
import { type Message } from "discord.js";
import { randomBetween } from "../utils/random";

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

    if (!message.inGuild()) return;

    const score = randomBetween(-1, 1);

    await this.container.db.message.add(message, score);
  }
}
