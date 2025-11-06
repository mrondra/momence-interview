import { getPerUnitRate } from './getPerUnitRate';
import type { CnbRate } from '../api/cnb';

const makeRate = (overrides: Partial<CnbRate>): CnbRate => ({
  country: overrides.country ?? 'X',
  currency: overrides.currency ?? 'Test',
  amount: overrides.amount ?? 1,
  code: overrides.code ?? 'TST',
  rate: overrides.rate ?? 1,
});

describe('getPerUnitRate', () => {
  test.each<[
    CnbRate,
    number | null
  ]>([
    // basic direct rate (amount=1)
    [makeRate({ amount: 1, rate: 25 }), 25],
    [makeRate({ amount: 1, rate: 1 }), 1],

    // published for multiple units (e.g. 100 JPY)
    [makeRate({ amount: 100, rate: 156 }), 1.56],
    [makeRate({ amount: 3, rate: 10.5 }), 3.5],

    // decimals
    [makeRate({ amount: 5, rate: 12.345 }), 12.345 / 5],

    // large numbers
    [makeRate({ amount: 1000, rate: 987654.321 }), 987.654321],

    // invalid amount (zero)
    [makeRate({ amount: 0, rate: 25 }), null],
    // invalid amount (negative)
    [makeRate({ amount: -5, rate: 25 }), null],

    // invalid rate (zero)
    [makeRate({ amount: 1, rate: 0 }), null],
    // invalid rate (negative)
    [makeRate({ amount: 1, rate: -10 }), null],

    // both invalid
    [makeRate({ amount: 0, rate: 0 }), null],
    [makeRate({ amount: -3, rate: -7 }), null],
  ])('rate %o => per unit %s', (rate, expected) => {
    expect(getPerUnitRate(rate)).toBe(expected);
  });

  test('precision: result keeps fractional accuracy', () => {
    const rate = makeRate({ amount: 7, rate: 1.234567 });
    const perUnit = getPerUnitRate(rate);
    expect(perUnit).not.toBeNull();
    expect(perUnit!).toBeCloseTo(1.234567 / 7, 12);
  });
});

