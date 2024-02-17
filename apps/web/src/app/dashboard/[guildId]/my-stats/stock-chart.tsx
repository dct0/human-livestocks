"use client";

import { Skeleton } from "@/app/_components/ui/skeleton";
import { formatAsGraphDate } from "@/lib/utils";
import { api } from "@/trpc/react";
import { LineChart } from "@tremor/react";
import { useMemo } from "react";

export default function StockChart() {
  const { data: stocks, isFetched } = api.stock.get.useQuery({});

  const data = useMemo(() => {
    if (!stocks) return [];
    return stocks
      .map((stockPrice) => ({
        ...stockPrice,
        createdAt: formatAsGraphDate(stockPrice.createdAt),
      }))
      .toReversed(); // api should return in order so no need to sort
  }, [stocks]);

  return isFetched ? (
    <LineChart
      data={data}
      index="createdAt"
      categories={["price"]}
      connectNulls
    />
  ) : (
    <Skeleton className="h-80" />
  );
}
