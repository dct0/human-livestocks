import React from "react";
import { Badge } from "@tremor/react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { LineChart } from "@tremor/react";

const data = {
  user: "John Doe",
  timestamp: "04/05/2024 4:07PM",
  message: "Human Livestocks sucks",
  score: -20.26,
  reaction: "👎",
  reactionCount: 12,
  chart: [
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
  ],
};

export default function PreviewCard() {
  return (
    <div className="relative ml-0 w-full max-w-lg scale-90 rounded-xl border border-tremor-border p-4 md:scale-100">
      <LineChart
        className="h-64"
        data={data.chart ?? []}
        index="date"
        categories={[data.user]}
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
                {data.user}
              </span>
              <span className="text-xs font-medium text-gray-400">
                {data.timestamp}
              </span>
            </p>
            <p className="text-gray-100">{data.message}</p>
            <div className="w-fit rounded-md bg-slate-900 px-2 font-semibold text-tremor-content-emphasis dark:bg-gray-800 dark:text-dark-tremor-content-emphasis">
              <p>
                {data.reaction} {data.reactionCount}
              </p>
            </div>
          </div>
        </div>

        <Badge
          className="mr-2 h-fit lg:ml-8"
          color={data.score > 0 ? "green" : "red"}
        >
          Score: {data.score}
        </Badge>
      </div>
    </div>
  );
}
