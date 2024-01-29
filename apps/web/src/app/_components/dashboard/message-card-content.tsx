"use client";
import { Tab, TabGroup, TabList, Title } from "@tremor/react";
import { Flame, Skull } from "lucide-react";

export default function MessageCardContent() {
  return (
    <>
      <div className="flex items-end justify-between">
        <Title>Messages</Title>
        <TabGroup className="!w-fit" defaultIndex={1}>
          <TabList variant="solid">
            <Tab icon={Skull}>Worst</Tab>
            <Tab icon={Flame}>Best</Tab>
          </TabList>
        </TabGroup>
      </div>
      <div className="flex flex-col">
        <div>Messages</div>
        <div>Messages</div>
      </div>
    </>
  );
}
