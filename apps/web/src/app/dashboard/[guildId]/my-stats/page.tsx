import MessageCardContent from "@/app/_components/dashboard/message-card-content";
import StockChart from "@/app/_components/stock-chart";
import { api } from "@/trpc/server";
import { Card, Col, Grid, Title } from "@tremor/react";
import { type GuildDashboardLayoutProps } from "../types";

export default async function MyStats(props: GuildDashboardLayoutProps) {
  const stocks = await api.stocks.get.query({});

  return (
    <Grid className="gap-4" numItemsMd={3} numItems={1}>
      <Col numColSpanMd={3} numColSpan={1}>
        <Card>
          <Title>Stock Price</Title>
          <StockChart stocks={stocks} />
        </Card>
      </Col>
      <Col numColSpanMd={2} numColSpan={1}>
        <Card>
          <MessageCardContent />
        </Card>
      </Col>
      <Col numColSpanMd={1} numColSpan={1}>
        <Card>
          <Title>Users</Title>
          <div>Text</div>
        </Card>
      </Col>
    </Grid>
  );
}
