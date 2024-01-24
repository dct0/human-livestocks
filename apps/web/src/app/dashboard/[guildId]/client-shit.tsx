"use client";
import { useSetAtom } from "jotai";
import { guildAtom } from "@/atoms/guild";
import { useEffect } from "react";

// Stupid hack to sync the guild atom with the guildId in the URL and pass it to the navbar and display a "breadcrumb" of sorts
// Probably could use pathname but this will work for now
export default function ClientShit({ guildId }: { guildId: string }) {
  const setGuildId = useSetAtom(guildAtom);

  useEffect(() => {
    setGuildId(guildId);

    return () => {
      setGuildId(null);
    };
  }, [guildId, setGuildId]);

  return null;
}
