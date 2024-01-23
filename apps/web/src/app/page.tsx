import { cn } from "@/lib";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Subtitle } from "@tremor/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-10 px-20 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
        <h1 className="text-8xl font-bold">
          Human <br /> Livestocks
        </h1>
        <div className="text-left lg:text-right">
          <h2 className="text-4xl font-semibold">You are the commodity</h2>
          <Subtitle>Your bests, your blunders. As a number.</Subtitle>
          <hr className="my-3" />
          <Link
            className="group mt-3 inline-flex flex-shrink-0 items-center justify-center rounded-tremor-default border border-tremor-brand bg-icon-discord px-4 py-2 text-sm font-medium text-tremor-brand-inverted shadow-tremor-input outline-none hover:border-tremor-brand-emphasis hover:bg-icon-discord-hover dark:border-dark-tremor-brand dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:border-dark-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis"
            href="/api/invite"
            target="_blank"
          >
            <SiDiscord className={cn("mr-1.5 inline-block")} size={20} />
            <span>Invite to server</span>
          </Link>
        </div>
      </div>
    </>
  );
}
