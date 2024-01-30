import MessageCardContent from "@/app/_components/dashboard/message-card-content";
import StockChart from "@/app/_components/stock-chart";
import { Card, Col, Grid, Text, Title } from "@tremor/react";

export default function MyStats() {
  return (
    <Grid className="gap-4" numItemsMd={3} numItems={1}>
      <Col numColSpanMd={3} numColSpan={1}>
        <Card>
          <Title>Stock Price</Title>
          <StockChart />
        </Card>
      </Col>
      <Col numColSpanMd={2} numColSpan={1}>
        <Card>
          <MessageCardContent />
        </Card>
      </Col>
      <Col numColSpanMd={1} numColSpan={1}>
        <Card className="h-full">
          <Title className="mb-2">Coming soon...</Title>
          <Text>Coming soon...</Text>
        </Card>
      </Col>
    </Grid>
  );
}
