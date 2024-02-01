import MessageCardContent from "@/app/_components/dashboard/message-card-content";
import StockChart from "@/app/_components/stock-chart";
import { Card, Col, Grid, Title } from "@tremor/react";

export default function Overview() {
  return (
    <Grid className="gap-4" numItemsMd={3} numItems={1}>
      <Col numColSpanMd={3} numColSpan={1}>
        <Card>
          <Title>Top stocks</Title>
          {/* TODO: Show top x stocks */}
          <StockChart />
        </Card>
      </Col>
      <Col numColSpanMd={1} numColSpan={1}>
        <Card className="h-full">
          <Title className="mb-2">Top stocks</Title>
        </Card>
      </Col>
      <Col numColSpanMd={2} numColSpan={1}>
        <Card className="h-full">
          <MessageCardContent
            title={<Title>Top Messages (past week)</Title>}
            own={false}
          />
        </Card>
      </Col>
    </Grid>
  );
}
