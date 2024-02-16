"use client";

import { formatAsGraphDate } from "@/lib/utils";
import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

// Rounds date to nearest day
const truncateDate = (date: Date) => {
  return date.toISOString().split("T")[0]!;
};

export default function TopStocksChart() {
  const { data: topMembers } = api.stock.getTop.useQuery({});

  const categories = useMemo(() => {
    if (!topMembers) return [];
    return topMembers.map((member) => member.user.name ?? member.user.id) ?? [];
  }, [topMembers]);

  const data = useMemo(() => {
    if (!topMembers) return [];

    const dateMap = new Map<string, Record<string, number>>();

    for (const member of topMembers) {
      for (const stock of member.stockPrices) {
        const date = truncateDate(new Date(stock.createdAt));
        const existing = dateMap.get(date) ?? {};

        const prices = {
          ...existing,
          [member.user.name ?? member.user.id]: stock.price.toNumber(),
        };

        dateMap.set(date, prices);
      }
    }

    const dates = Array.from(dateMap.keys()).sort((a, b) => a.localeCompare(b));
    const result = dates.map((date) => {
      const prices = dateMap.get(date) ?? {};
      return {
        date: formatAsGraphDate(date),
        ...prices,
      };
    });
    return result;
  }, [topMembers]);

  return (
    <LineChart data={data} index="date" categories={categories} connectNulls />
  );
}
