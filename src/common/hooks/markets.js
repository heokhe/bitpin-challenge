import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export function useMarkets() {
  const { data, isLoading } = useSWR(
    'https://api.bitpin.ir/v1/mkt/markets/',
    (key) => fetcher(key).then((data) => data.results),
  );
  return { data, isLoading };
}

export function useMarket(id) {
  const { data, isLoading } = useMarkets();
  const market = data?.find((m) => m.id.toString() === id);
  return { market, isLoading };
}
