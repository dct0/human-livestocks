import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import {
  Card,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";
import AuthError from "../_components/error/auth-error";
import StockChart from "../_components/stock-chart";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    return <AuthError />;
  }

  const stocks = await api.stocks.get.query({});

  return (
    <TabGroup className="mt-6">
      <TabList>
        <Tab>Overview</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
            <Card>
              {/* Placeholder to set height */}
              <div className="h-28" />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className="h-28" />
            </Card>
            <Card>
              {/* Placeholder to set height */}
              <div className="h-28" />
            </Card>
          </Grid>
          <div className="mt-6">
            <Card>
              <div className="h-80" />
            </Card>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-6">
            <Card>
              <Title>Stock Price</Title>
              <StockChart stocks={stocks} />
            </Card>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
