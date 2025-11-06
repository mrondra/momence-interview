import type { CnbRate } from '../api/cnb';

export function convertCzkToForeign(rate: CnbRate, czkAmount: number): number {
  if (rate.rate <= 0) return 0;
  if (!isFinite(czkAmount)) return 0;
  return (czkAmount / rate.rate) * rate.amount;
}

