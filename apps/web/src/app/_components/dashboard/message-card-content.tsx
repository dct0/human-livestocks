"use client";
import { Tab, TabGroup, TabList, Title } from "@tremor/react";
import { Flame, Skull } from "lucide-react";
import Message from "./message";

export default function MessageCardContent() {
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
        <Message
          author={{ username: "John Doe", iconURL: "" }}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl."
          createdAt={new Date()}
        />
        <Message
          author={{ username: "John Doe", iconURL: "" }}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl."
          createdAt={new Date()}
        />{" "}
        <Message
          author={{ username: "John Doe", iconURL: "" }}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl."
          createdAt={new Date()}
        />{" "}
        <Message
          author={{ username: "John Doe", iconURL: "" }}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl."
          createdAt={new Date()}
        />{" "}
        <Message
          author={{ username: "John Doe", iconURL: "" }}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, vitae ultricies nisl nunc vitae nisl."
          createdAt={new Date()}
        />
      </div>
    </>
  );
}
