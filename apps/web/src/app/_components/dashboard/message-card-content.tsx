"use client";
import { api } from "@/trpc/react";
import { type RouterInputs } from "@/trpc/shared";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { Flame, Skull } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";
import Message from "./message";

export type MessageCardContentProps = {
  title: ReactNode;
  own: boolean;
  guildId?: string;
};

const getIndex = (sentiment: RouterInputs["message"]["get"]["sentiment"]) => {
  switch (sentiment) {
    case "negative":
      return 0;
    case "positive":
      return 1;
  }
};

export default function MessageCardContent({
  title,
  own,
  guildId,
}: MessageCardContentProps) {
  const [sentiment, setSentiment] =
    useState<RouterInputs["message"]["get"]["sentiment"]>("positive");
  const { data: messages, isFetched } = api.message.get.useQuery({
    sentiment,
    own,
    guildId,
  });

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        {title}
        <TabGroup
          className="!w-fit"
          defaultIndex={1}
          index={getIndex(sentiment)}
        >
          <TabList variant="solid">
            <Tab icon={Skull} onClick={() => setSentiment("negative")}>
              Worst
            </Tab>
            <Tab icon={Flame} onClick={() => setSentiment("positive")}>
              Best
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      {isFetched ? (
        <div className="flex max-h-96 flex-col overflow-y-auto">
          {messages?.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
      ) : (
        <Skeleton className="h-48" />
      )}
    </>
  );
}
