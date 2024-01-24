import { Events, Listener } from "@sapphire/framework";
import { type Message } from "discord.js";

export class MessageDeleteListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageDelete,
    });
  }

  public async run(message: Message): Promise<void> {
    this.container.logger.info(`Message deleted: ${message.content}`);

    if (!message.inGuild() || message.author.bot) return; // allow specific bots later

    await this.container.db.message.delete({
      where: {
        id: message.id,
      },
    });
  }
}
