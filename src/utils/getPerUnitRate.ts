import type { CnbRate } from '../api/cnb';

export function getPerUnitRate({ amount, rate }: CnbRate): number | null {
  if (amount <= 0 || rate <= 0) return null;
  return rate / amount;
}
