"use client";

import { LineChart } from "@tremor/react";
import { type StockPrice } from "db";

export default function StockChart({ stocks }: { stocks: StockPrice[] }) {
  const data = stocks.map((stockPrice) => ({
    ...stockPrice,
    createdAt: `${stockPrice.createdAt.toLocaleDateString()} ${stockPrice.createdAt.toLocaleTimeString()}`,
  }));

  return <LineChart data={data} index="createdAt" categories={["price"]} />;
}
