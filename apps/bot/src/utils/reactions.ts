import { type GuildEmoji, type ReactionEmoji } from "discord.js";

export const getEmojiName = (
  emoji: GuildEmoji | ReactionEmoji,
): string | undefined => {
  // If server emoji
  if (emoji.id) {
    return emoji.identifier.split(":")[1];
  }

  return emoji.identifier;
};
