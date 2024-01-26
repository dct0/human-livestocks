import { api } from "@/trpc/server";
import { GuildDashboardLayoutProps } from "../types";
import StockChart from "@/app/_components/stock-chart";
import { Card, Title } from "@tremor/react";

export default async function MyStats(props: GuildDashboardLayoutProps) {
  const stocks = await api.stocks.get.query({});

  return (
    <>
      <Title>Here is the my-stats page</Title>
      <Card>
        <Title>Stock Price</Title>
        <StockChart stocks={stocks} />
      </Card>
    </>
  );
}
