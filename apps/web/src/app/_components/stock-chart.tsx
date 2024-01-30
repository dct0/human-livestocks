"use client";

import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

export default function StockChart() {
  const { data: stocks } = api.stock.get.useQuery({});

  const data = useMemo(() => {
    if (!stocks) return [];
    return stocks
      .map((stockPrice) => ({
        ...stockPrice,
        createdAt: stockPrice.toLocaleString(),
      }))
      .toReversed();
  }, [stocks]);

  return <LineChart data={data} index="createdAt" categories={["price"]} />;
}
