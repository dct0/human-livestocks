import { type GuildEmoji, type ReactionEmoji } from "discord.js";
import { badReactions, goodReactions } from "../constants/reactions";

export const getSentimentFromEmoji = (
  emoji: GuildEmoji | ReactionEmoji,
): number => {
  const emojiName = emoji.name;

  if (!emojiName) return 0;

  if (goodReactions.includes(emojiName)) {
    return 1;
  } else if (badReactions.includes(emojiName)) {
    return -1;
  }

  return 0;
};
