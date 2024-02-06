"use client";

import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
        const date = formatDate(new Date(stock.createdAt));
        const existing = dateMap.get(date) ?? {};

        const prices = {
          ...existing,
          [member.user.name ?? member.user.id]: stock.price.toNumber(),
        };

        dateMap.set(date, prices);
      }
    }

    const dates = Array.from(dateMap.keys()).sort();
    const result = dates.map((date) => {
      const prices = dateMap.get(date) ?? {};
      return {
        date: new Date(date).toLocaleString("default", {
          month: "short",
          day: "numeric",
        }),
        ...prices,
      };
    });
    return result;
  }, [topMembers]);

  return (
    <LineChart data={data} index="date" categories={categories} connectNulls />
  );
}
