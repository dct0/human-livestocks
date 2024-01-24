"use client";
import { guildAtom } from "@/atoms/guild";
import { api } from "@/trpc/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

export default function GuildSelect() {
  const router = useRouter();
  const guild = useAtomValue(guildAtom);

  const { data: options } = api.guild.getAll.useQuery();

  const handleValueChange = (value?: string) => {
    if (!value) return router.push(`/dashboard`);

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
          {guild.name}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
}
