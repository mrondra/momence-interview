import { convertCzkToForeign } from './convertCzkToForeign';
import type { CnbRate } from '../api/cnb';

const makeRate = (overrides: Partial<CnbRate>): CnbRate => ({
  country: 'Testland',
  currency: overrides.currency || 'Test Currency',
  amount: overrides.amount ?? 1,
  code: overrides.code || 'TST',
  rate: overrides.rate ?? 1,
});

describe('convertCzkToForeign', () => {
  test.each<[
    CnbRate,
    number,
    number
  ]>([
    // Basic 1:1 conversion (rate 25 CZK for 1 UNIT)
    [makeRate({ code: 'USD', currency: 'US Dollar', amount: 1, rate: 25 }), 250, 10],
    [makeRate({ code: 'USD', currency: 'US Dollar', amount: 1, rate: 25 }), 25, 1],
    [makeRate({ code: 'USD', currency: 'US Dollar', amount: 1, rate: 25 }), 0, 0],

    // Amount not equal to 1 (e.g. JPY published per 100 units)
    [makeRate({ code: 'JPY', currency: 'Japanese Yen', amount: 100, rate: 15.6 }), 15.6, 100], // 15.6 CZK buys 100 JPY
    [makeRate({ code: 'JPY', currency: 'Japanese Yen', amount: 100, rate: 15.6 }), 31.2, 200],

    // Non-integer CZK amount
    [makeRate({ code: 'EUR', currency: 'Euro', amount: 1, rate: 24.35 }), 48.7, 2],

    // Zero / negative rate should yield 0
    [makeRate({ code: 'BAD', currency: 'Bad', amount: 1, rate: 0 }), 100, 0],
    [makeRate({ code: 'BAD', currency: 'Bad', amount: 1, rate: -5 }), 100, 0],

    // Infinite or NaN CZK amount -> 0
    [makeRate({ code: 'INF', currency: 'Infinite', amount: 1, rate: 10 }), Infinity, 0],
    [makeRate({ code: 'NAN', currency: 'Not a Number', amount: 1, rate: 10 }), NaN, 0],

    // Large values
    [makeRate({ code: 'BIG', currency: 'Big', amount: 1, rate: 20 }), 1_000_000, 50000],

    // amount = 0 (unusual, but formula would produce 0)
    [makeRate({ code: 'ZERO', currency: 'Zero', amount: 0, rate: 22 }), 220, 0],
  ])('rate %o czkAmount %d => %d', (rate, czkAmount, expected) => {
    expect(convertCzkToForeign(rate, czkAmount)).toBeCloseTo(expected, 10);
  });

  test('precision check with fractional results', () => {
    const rate = makeRate({ code: 'PREC', currency: 'Precision', amount: 1, rate: 23.4567 });
    const result = convertCzkToForeign(rate, 11.72835); // half of rate
    expect(result).toBeCloseTo(0.5, 12);
  });
});

