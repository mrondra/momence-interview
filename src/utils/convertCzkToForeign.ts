import type { CnbRate } from '../api/cnb';

export function convertCzkToForeign(rate: CnbRate, czkAmount: number): number {
  if (rate.rate <= 0 || !isFinite(czkAmount)) return 0;
  return (czkAmount / rate.rate) * rate.amount;
}

