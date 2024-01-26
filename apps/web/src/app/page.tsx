import { cn } from "@/lib";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Subtitle } from "@tremor/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-10 px-20 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
        <h1 className="text-8xl font-bold text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
          Human <br /> Livestocks
        </h1>
        <div className="text-left lg:text-right">
          <h2 className="text-4xl font-semibold text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
            You are the commodity
          </h2>
          <Subtitle>Your bests, your blunders. As a number.</Subtitle>
          <hr className="my-3" />
          <Link
            className="group mt-3 inline-flex flex-shrink-0 items-center justify-center rounded-tremor-default bg-icon-discord px-4 py-2 text-sm font-medium text-white shadow-tremor-input outline-none hover:bg-icon-discord-hover"
            href="/api/invite"
            target="_blank"
          >
            <SiDiscord className={cn("mr-1.5 inline-block")} size={20} />
            <span>Invite to server</span>
          </Link>
          T
        </div>
      </div>
    </>
  );
}
