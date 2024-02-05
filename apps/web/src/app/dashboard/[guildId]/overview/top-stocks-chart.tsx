"use client";

import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

export default function TopStocksChart() {
  const { data: stocks } = api.stock.getTop.useQuery({});

  const categories = useMemo(() => {
    if (!stocks) return [];

    return stocks.map((stock) => stock.member.user.name ?? stock.member.userId);
  }, [stocks]);

  const data = useMemo(() => {
    if (!stocks) return [];

    const dataMap = new Map<Date, Record<string, number>>();

    stocks.forEach((stock) => {
      const existing = dataMap.get(stock.createdAt) ?? {};
      dataMap.set(stock.createdAt, {
        ...existing,
        [stock.member.user.name ?? stock.member.userId]: stock.price.toNumber(), // user names are now unique so this is okay
      });
    });

    return Array.from(dataMap.entries())
      .map(([createdAt, values]) => ({
        createdAt,
        ...values,
      }))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((stockPrice) => ({
        ...stockPrice,
        createdAt: stockPrice.createdAt.toLocaleString(),
      }));
  }, [stocks]);

  return (
    <LineChart
      data={data}
      index="createdAt"
      categories={categories}
      connectNulls
    />
  );
}
