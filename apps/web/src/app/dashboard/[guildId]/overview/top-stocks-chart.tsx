"use client";

import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default function TopStocksChart() {
  const { data: stocks } = api.stock.getTop.useQuery({});

  const categories = useMemo(() => {
    if (!stocks) return [];

    const uniqueMembers = new Set(
      stocks.map((stock) => stock.member.user.name ?? stock.member.userId),
    );

    return Array.from(uniqueMembers);
  }, [stocks]);

  const data = useMemo(() => {
    if (!stocks) return [];

    const dataMap = new Map<string, Record<string, number>>();

    for (const stock of stocks) {
      const existing = dataMap.get(formatDate(stock.createdAt)) ?? {};
      dataMap.set(formatDate(stock.createdAt), {
        ...existing,
        [stock.member.user.name ?? stock.member.userId]: stock.price.toNumber(), // user names are now unique so this is okay
      });
    }

    return Array.from(dataMap.entries())
      .map(([date, values]) => ({
        date,
        ...values,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((dataPoint) => {
        const date = new Date(dataPoint.date);
        const formattedDate = date.toLocaleString("default", {
          month: "short",
          day: "2-digit",
        });

        return {
          ...dataPoint,
          date: formattedDate,
        };
      });
  }, [stocks]);

  return (
    <LineChart data={data} index="date" categories={categories} connectNulls />
  );
}
