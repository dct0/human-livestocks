import { type GuildEmoji, type ReactionEmoji } from "discord.js";
import { badReactions, goodReactions } from "../constants/reactions";

export const getEmojiName = (
  emoji: GuildEmoji | ReactionEmoji,
): string | undefined => {
  // If server emoji
  if (emoji.id) {
    return emoji.identifier.split(":")[1];
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
