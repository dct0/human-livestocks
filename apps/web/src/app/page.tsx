"use client";
import { env } from "@/env.mjs";
import { Badge } from "@tremor/react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Subtitle } from "@tremor/react";
import Link from "next/link";
import { LineChart } from "@tremor/react";

const chartData = [
  {
    date: "Apr 1",
    "John Doe": 23.38,
  },
  {
    date: "Apr 2",
    "John Doe": 21.03,
  },
  {
    date: "Apr 3",
    "John Doe": 21.94,
  },
  {
    date: "Apr 4",
    "John Doe": 21.08,
  },
  {
    date: "Apr 5",
    "John Doe": 0.82,
  },
];

export default function Home() {
  return (
    <>
      {/* <div className="flex flex-1 flex-col gap-10 px-20 py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
        <h1 className="text-8xl font-bold text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
          Human <br /> Livestocks
        </h1>
        <div className="text-left lg:text-right">
          <h2 className="text-4xl font-semibold text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
            You are the commodity
          </h2>
          <Subtitle>Your bests, your blunders. As a number.</Subtitle>
          <hr className="my-3" />

        </div>
      </div> */}
      <div className="flex max-w-5xl flex-1 flex-col-reverse items-center justify-center space-y-8 self-center md:flex-row md:space-x-8 md:px-8">
        <div className="space-y-3 text-tremor-content-emphasis md:space-y-8 dark:text-dark-tremor-content-emphasis">
          <h1 className="text-3xl font-bold md:text-6xl">
            You are the commodity
          </h1>
          <Subtitle className="text-xl text-tremor-content-emphasis md:text-3xl dark:text-dark-tremor-content-emphasis">
            Your bests, your blunders. As a number.
          </Subtitle>
          <Link
            className="!mt-4 inline-flex items-center justify-center rounded-tremor-default bg-icon-discord px-4 py-2 text-sm font-medium text-white shadow-tremor-input outline-none hover:bg-icon-discord-hover"
            href={env.NEXT_PUBLIC_INVITE_URL}
            target="_blank"
          >
            <SiDiscord className="mr-1.5 inline-block" size={20} />
            <span>Invite to server</span>
          </Link>
        </div>

        <div className="relative ml-0 w-full max-w-lg scale-90 rounded-xl border border-tremor-border p-4 md:scale-100">
          <LineChart
            className="h-64"
            data={chartData}
            index="date"
            categories={["John Doe"]}
          />

          <div className="absolute left-8 top-1/3 space-y-4 rounded-lg bg-slate-700 p-4 lg:flex">
            <div className="flex">
              <SiDiscord
                className="relative mr-4 mt-0.5 h-10 w-10 min-w-fit overflow-hidden rounded-full bg-tremor-brand p-2"
                size={20}
                color="#fff"
              />
              <div>
                <p className="flex items-baseline text-nowrap">
                  <span className="mr-2 font-medium text-green-400">
                    John Doe
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    05/03/2024, 20:01:27
                  </span>
                </p>
                <p className="text-gray-100">Human Livestocks sucks</p>
                <div className="flex w-fit items-center space-x-2 rounded-md bg-slate-900 px-2 font-semibold text-tremor-content-emphasis dark:bg-gray-800 dark:text-dark-tremor-content-emphasis">
                  <span>👎</span>
                  <span>12</span>
                </div>
              </div>
            </div>

            <Badge className="mr-2 h-fit lg:ml-8" color="red">
              Score: -20.26
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
