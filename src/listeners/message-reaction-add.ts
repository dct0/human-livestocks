import { getEmojiName } from "../utils/reactions";

import { Events, Listener } from "@sapphire/framework";
import { type MessageReaction, type User } from "discord.js";

export class MessageReactionAdd extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: Events.MessageReactionAdd,
    });
  }

  public async run(messageReaction: MessageReaction, user: User) {
    this.container.logger.info(
      `Reaction received: ${getEmojiName(messageReaction.emoji)} from ${
        user.username
      }`,
    );
  }
}
