"use client";
import { api } from "@/trpc/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuildSelect() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: options } = api.guild.getAll.useQuery();

  // :(
  const guildId = pathname.split("/")[2];
  const [guild, setGuild] = useState(guildId);

  useEffect(() => {
    setGuild(guildId);

    return () => setGuild(undefined);
  }, [guildId]);

  const handleValueChange = (value: string) => {
    setGuild(value);
    router.push(`/dashboard/${value}/overview`);
  };

  return (
    <SearchSelect
      value={guild ?? ""}
      onValueChange={handleValueChange}
      enableClear={false}
      placeholder="Select a guild..."
      id="guild-select"
      aria-required
    >
      {options?.map((guild) => (
        <SearchSelectItem key={guild.id} value={guild.id}>
          <Link href={`/dashboard/${guild.id}/overview`}>{guild.name}</Link>
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
}
