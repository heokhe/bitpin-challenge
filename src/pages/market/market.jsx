import { useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import Button from '../../common/components/Button';
import NavBar from '../../common/components/NavBar';
import { useMarket } from '../../data/hooks/markets';
import { fetcher } from '../../common/utils/fetcher';
import MatchesView from './components/MatchesView';
import OrdersView from './components/OrdersView';
import TabView from '../../common/components/TabView';

export default function MarketPage() {
  const { id } = useParams();

  const { market } = useMarket(id);

  const { data: sellOrders } = useSWR(
    `https://api.bitpin.org/v2/mth/actives/${id}/?type=sell`,
    (key) => fetcher(key),
    {
      refreshInterval: 3000,
    },
  );
  const { data: buyOrders } = useSWR(
    `https://api.bitpin.org/v2/mth/actives/${id}/?type=buy`,
    (key) => fetcher(key),
    {
      refreshInterval: 3000,
    },
  );
  const { data: matches } = useSWR(
    `https://api.bitpin.org/v1/mth/matches/${id}/`,
    (key) => fetcher(key),
    {
      refreshInterval: 3000,
    },
  );
  const [tab, setTab] = useState(0);

  return (
    <div className="mx-auto max-w-7xl">
      <NavBar
        title={
          <div className="flex items-center gap-x-4">
            <img
              className="rounded-full border border-divider h-8"
              src={market?.currency1.image}
            />
            {market?.title}
          </div>
        }
        tabs={
          <>
            <Button
              variant={tab === 0 ? 'soft' : 'text'}
              onClick={() => setTab(0)}
            >
              Sell
            </Button>
            <Button
              variant={tab === 1 ? 'soft' : 'text'}
              onClick={() => setTab(1)}
            >
              Buy
            </Button>
            <Button
              variant={tab === 2 ? 'soft' : 'text'}
              onClick={() => setTab(2)}
            >
              Matches
            </Button>
          </>
        }
      />
      <div className="py-8">
        <TabView index={tab} onChange={setTab}>
          <OrdersView market={market} orders={buyOrders?.orders ?? []} />
          <OrdersView market={market} orders={sellOrders?.orders ?? []} />
          <MatchesView matches={matches ?? []} />
        </TabView>
      </div>
    </div>
  );
}
