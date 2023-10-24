import { type GuildEmoji, type ReactionEmoji } from "discord.js";
import { badReactions, goodReactions } from "../constants/reactions";

export const getEmojiDiscriminator = (
  emoji: GuildEmoji | ReactionEmoji,
): string => {
  return emoji.id ? emoji.id : emoji.identifier;
};

export const getEmojiName = (emoji: GuildEmoji | ReactionEmoji): string => {
  // If server emoji
  if (emoji.id) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- always on a guild emoji
    return emoji.name!;
  }

  return emoji.identifier;
};

export const getSentimentFromEmoji = (
  emoji: GuildEmoji | ReactionEmoji,
): number => {
  const emojiName = getEmojiName(emoji);

  if (!emojiName) return 0;

  if (goodReactions.includes(emojiName)) {
    return 1;
  } else if (badReactions.includes(emojiName)) {
    return -1;
  }

  return 0;
};
