"use client";
import { cn } from "@/lib";
import { api } from "@/trpc/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { type Guild } from "db";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

// there should be a way to load this serverside with a mix of parallel and intercepting routes... and maybe a portal?
export default function GuildSelect() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: options, isFetched } = api.guild.getAll.useQuery();

  // :(
  const guildId = pathname.split("/")[2];
  const [guild, setGuild] = useState(guildId);

  const currentGuild = options?.find((guild) => guild.id === guildId);

  useEffect(() => {
    setGuild(guildId);

    return () => setGuild(undefined);
  }, [guildId]);

  const handleValueChange = (value: string) => {
    setGuild(value);
    router.push(`/dashboard/${value}/overview`);
  };

  return isFetched ? (
    <SearchSelect
      className={cn(
        "select-fixer h-12",
        currentGuild ? "select-fixer-with-icon" : undefined,
      )}
      value={guild ?? ""}
      onValueChange={handleValueChange}
      enableClear={false}
      placeholder="Select a guild..."
      id="guild-select"
      aria-required
      icon={currentGuild ? () => <GuildIcon {...currentGuild} /> : undefined}
    >
      {options?.map((guild) => (
        <SearchSelectItem
          key={guild.id}
          value={guild.id}
          icon={() => (
            /* Cursed react */
            <GuildIcon className="mr-2" {...guild} />
          )}
        >
          {guild.name}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  ) : (
    <Skeleton className="h-12 w-[15rem]" />
  );
}

export type GuildIconProps = Pick<Guild, "name" | "iconURL"> & {
  className?: string;
};

export function GuildIcon({ className, name, iconURL }: GuildIconProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={iconURL!} alt={`Guild icon for ${name}`} />
      <AvatarFallback>{name.at(0)}</AvatarFallback>
    </Avatar>
  );
}
