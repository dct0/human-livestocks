"use client";
import { cn } from "@/lib";
import { api } from "@/trpc/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { type Guild } from "db";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// there should be a way to load this serverside with a mix of parallel and intercepting routes... and maybe a portal?
export default function GuildSelect() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: options, isFetched, isError } = api.guild.getAll.useQuery();

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

  return (
    !isError &&
    isFetched && (
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
        icon={currentGuild ? () => GuildIcon(currentGuild) : undefined}
      >
        {options?.map((guild) => (
          <SearchSelectItem
            key={guild.id}
            value={guild.id}
            icon={() => GuildIcon(guild)}
          >
            {guild.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    )
  );
}

export function GuildIcon({ name, iconURL }: Guild) {
  // mr-4 is mandatory because we can't set the spacing on the selected item
  // the select item icon doesn't have spacing, but the selected does...

  return iconURL ? (
    <Image
      src={iconURL}
      alt={`Guild icon for ${name}`}
      className="mr-2 rounded-full"
      width={32}
      height={32}
    />
  ) : (
    <span className="mr-2 aspect-square h-8 w-8 rounded-full bg-tremor-brand-muted text-center text-xs text-tremor-content-strong dark:bg-dark-tremor-brand-muted dark:text-dark-tremor-content-strong">
      {name.at(0)}
    </span>
  );
}
