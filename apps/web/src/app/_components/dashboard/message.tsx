"use client";
import { getInitials } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";
import { Badge, Icon } from "@tremor/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type MessageProps = RouterOutputs["message"]["get"][number];

type Reaction = {
  discriminator: string;
  count: number;
  members: RouterOutputs["message"]["get"][number]["impressions"][number]["createdById"][]; // TODO populate this
};

export default function Message({
  content,
  createdBy,
  createdAt,
  calculatedScore,
  impressions,
  id,
  channelId,
  guildId,
}: MessageProps) {
  const name = createdBy.user.name ?? createdBy.userId;
  const [timestamp, setTimestamp] = useState<Date>();

  // fuck ssr
  useEffect(() => {
    setTimestamp(createdAt);
  }, [createdAt]);

  // reconstruct the reaction list from the impressions
  const reactions = useMemo(() => {
    const reactionImpressions = impressions.filter(
      (impression) => impression.type === "REACTION",
    );
    const reactionCountMap = new Map<string, Reaction>();

    for (const impression of reactionImpressions) {
      if (!impression.discriminator) return;

      const currentValue = reactionCountMap.get(impression.discriminator);
      if (!currentValue) {
        reactionCountMap.set(impression.discriminator, {
          discriminator: impression.discriminator,
          count: 1,
          members: [impression.createdById],
        });
      } else {
        reactionCountMap.set(impression.discriminator, {
          ...currentValue,
          count: currentValue.count + 1,
          members: [...currentValue.members, impression.createdById],
        });
      }
    }

    return Array.from(reactionCountMap.values());
  }, [impressions]);

  return (
    <article className="group relative flex gap-3 bg-tremor-background-muted py-2 pl-4 pr-6 first:rounded-t-lg first:pt-4 last:rounded-b-lg last:pb-4 hover:bg-tremor-background-muted dark:bg-dark-tremor-background-muted dark:hover:bg-gray-925">
      <Avatar className="mt-1">
        <AvatarImage src={createdBy.user.image!} alt={`@${name}`} />
        <AvatarFallback>
          {createdBy.user.name ? getInitials(createdBy.user.name) : "?"}
        </AvatarFallback>
      </Avatar>
      <div>
        <header className="flex items-end">
          <h3 className="font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {name}
            <time
              className="ml-2 text-sm font-normal text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
              dateTime={timestamp?.toISOString()}
            >
              {timestamp?.toLocaleString()}
            </time>
          </h3>
        </header>
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {content}
        </p>
        {!!reactions?.length && (
          <div className="mt-1 flex gap-2">
            {reactions.map((reaction) => (
              <div
                key={reaction.discriminator}
                className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-tremor-content dark:bg-gray-800 dark:text-dark-tremor-content-emphasis"
              >
                <span>{reaction.discriminator}</span>
                <span>{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute right-3 top-3 flex items-center">
        <Badge className="mr-2" color="yellow">
          Score: {calculatedScore.toFixed(2)}
        </Badge>
        <Link
          href={`discord://discord.com/channels/${guildId}/${channelId}/${id}`}
          target="_blank"
        >
          <Icon
            icon={ExternalLink}
            size="xs"
            variant="light"
            tooltip="Jump to message"
          />
        </Link>
      </div>
    </article>
  );
}
