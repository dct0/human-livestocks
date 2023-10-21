import { Events, Listener } from "@sapphire/framework";
import { Decimal } from "db/client/runtime/library";
import { type Message } from "discord.js";
import { calculateNewRate } from "stocks";

export class MessageCreateListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public async run(message: Message): Promise<void> {
    this.container.logger.info(`Message received: ${message.content}`);

    if (!message.inGuild()) return;

    // TODO: conduct some analysis on the message to determine the score
    const score = Math.random() * 10 - 5; // Score of the message is between -5 and 5

    const memberStock = await this.container.db.stockPrice.getLatest(
      message.author.id,
    );

    if (memberStock) {
      const recent = await this.container.db.stockPrice.getByMember(
        message.author.id,
        20,
      );
      const newRate = calculateNewRate(recent, new Decimal(score));

      await this.container.db.stockPrice.addToMember(
        message.author.id,
        newRate,
      );
    }

    void this.container.db.message.add(message, score);
  }
}
