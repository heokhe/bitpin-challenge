import { ArrowRightIcon } from 'lucide-react';

import { Link } from 'react-router';
import { useMarkets } from '../../data/hooks/markets';
import Button from '../../common/components/Button';
import { useSearchParams } from 'react-router';
import NavBar from '../../common/components/NavBar';

export default function MarketsPage() {
  const { data: markets } = useMarkets();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page')) || 0;
  const setPage = (newPage) => {
    setSearchParams({ page: newPage.toString(), tab });
  };

  const tab = parseInt(searchParams.get('tab')) || 0;
  const setTab = (newTab) => {
    setSearchParams({ tab: newTab.toString() });
  };

  const filteredData = markets
    ? markets.filter(
        (market) => market.currency2.code === (tab === 0 ? 'USDT' : 'IRT'),
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl">
      <NavBar
        title="Markets"
        tabs={
          <>
            <Button
              variant={tab === 0 ? 'soft' : 'text'}
              onClick={() => setTab(0)}
            >
              USDT
            </Button>
            <Button
              variant={tab === 1 ? 'soft' : 'text'}
              onClick={() => setTab(1)}
            >
              IRT
            </Button>
          </>
        }
      />
      <div className="px-8 pt-8">
        {markets ? (
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-w-xl mx-auto">
            {filteredData.slice(page * 10, (page + 1) * 10).map((market) => (
              <Link
                key={market.id}
                to={`/market/${market.id}`}
                className="flex flex-col p-4 border border-divider rounded-xl text-title duration-200 hover:bg-primary/5 hover:text-primary active:scale-95 hover:scale-105"
              >
                <div className="flex items-center">
                  <img
                    src={market.currency1.image}
                    className="border border-divider rounded-full size-8"
                  />
                  <ArrowRightIcon className="size-6 mx-2 opacity-60" />
                  <img
                    src={market.currency2.image}
                    className="border border-divider rounded-full size-8"
                  />
                </div>
                <div className="mt-2 font-medium text-lg">{market.title}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">Loading markets...</div>
        )}
      </div>
      {filteredData && (
        <div className="grid grid-cols-[1fr_max-content_1fr] gap-x-6 mt-6 items-center border-t border-t-divider py-4">
          <div className="text-right">
            <Button
              onClick={() => setPage(Math.max(page - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </Button>
          </div>
          <div className="text-sm tracking-wide">Page {page + 1}</div>
          <div>
            <Button
              onClick={() =>
                setPage((page + 1) * 10 < filteredData.length ? page + 1 : page)
              }
              disabled={(page + 1) * 10 >= filteredData.length}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
