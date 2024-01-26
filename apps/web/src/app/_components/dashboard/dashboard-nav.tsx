"use client";
import { Tab, TabGroup, TabList } from "@tremor/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function DashboardNav() {
  const pathname = usePathname();
  const currentTab = useMemo(() => pathname.split("/").at(-1)!, [pathname]);

  const getTabIndex = (tab: string) => {
    switch (tab) {
      case "overview":
        return 0;
      case "my-stats":
        return 1;
      default:
        return undefined;
    }
  };

  return (
    <TabGroup className="mb-6" index={getTabIndex(currentTab)}>
      <TabList>
        <Link href="overview">
          <Tab>Overview</Tab>
        </Link>
        <Link href="my-stats">
          <Tab>My Stats</Tab>
        </Link>
      </TabList>
    </TabGroup>
  );
}
