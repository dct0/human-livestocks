"use client";
import { env } from "@/env.mjs";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Subtitle } from "@tremor/react";
import Link from "next/link";
import PreviewCard from "@/app/_components/homepage/preview-card";

export default function Home() {
  return (
    <>
      <div className="flex max-w-5xl flex-1 flex-col-reverse items-center justify-center space-y-8 self-center md:flex-row md:space-x-8 md:px-8">
        <div className="space-y-3 text-tremor-content-emphasis md:space-y-8 dark:text-dark-tremor-content-emphasis">
          <h1 className="text-3xl font-bold md:text-6xl">
            You are the commodity
          </h1>
          <Subtitle className="text-xl text-tremor-content-emphasis md:text-3xl dark:text-dark-tremor-content-emphasis">
            Your bests, your blunders. As a number.
          </Subtitle>
          <Link
            className="!mt-4 inline-flex items-center justify-center rounded-tremor-default bg-icon-discord px-4 py-2 text-sm font-medium text-white shadow-tremor-input outline-none transition hover:bg-icon-discord-hover"
            href={env.NEXT_PUBLIC_INVITE_URL}
            target="_blank"
          >
            <SiDiscord className="mr-1.5 inline-block" size={20} />
            <span>Invite to server</span>
          </Link>
        </div>

        <PreviewCard />
      </div>
    </>
  );
}
