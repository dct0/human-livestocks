"use client";

import { LineChart } from "@tremor/react";
import { type StockPrice } from "db";
import { useMemo } from "react";

export default function StockChart({ stocks }: { stocks: StockPrice[] }) {
  const data = useMemo(() => {
    return stocks
      .map((stockPrice) => ({
        ...stockPrice,
        createdAt: `${stockPrice.createdAt.toLocaleDateString()} ${stockPrice.createdAt.toLocaleTimeString()}`,
      }))
      .toReversed();
  }, [stocks]);

  return <LineChart data={data} index="createdAt" categories={["price"]} />;
}
