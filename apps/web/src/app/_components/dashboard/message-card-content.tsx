"use client";
import { api } from "@/trpc/react";
import { Tab, TabGroup, TabList, Title } from "@tremor/react";
import { Flame, Skull } from "lucide-react";
import Message from "./message";

export default function MessageCardContent() {
  const { data: messages } = api.message.get.useQuery({});

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <Title>Top Messages (past week)</Title>
        <TabGroup className="!w-fit" defaultIndex={1}>
          <TabList variant="solid">
            <Tab icon={Skull}>Worst</Tab>
            <Tab icon={Flame}>Best</Tab>
          </TabList>
        </TabGroup>
      </div>
      <div className="flex max-h-96 flex-col overflow-y-auto">
        {messages?.map((message) => <Message key={message.id} {...message} />)}
      </div>
    </>
  );
}
