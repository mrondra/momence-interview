import { useQuery } from '@tanstack/react-query';
import { getCnbDailyRates } from './endpoint';
import type { CnbDailyResponse } from './types';

const QUERY_KEY = ['cnbDailyRates'];

export function useCnbRates() {
  return useQuery<CnbDailyResponse>({
    queryKey: QUERY_KEY,
    queryFn: getCnbDailyRates,
  });
}

