import { parseCnbDailyText } from '../parser';
import type { CnbDailyResponse } from '../types';

describe('parseCnbDailyText', () => {
  it('should parse valid CNB daily text format', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.632
Brazil|real|1|BRL|4.234
`;

    const result = parseCnbDailyText(text);

    expect(result).toEqual({
      asOf: '03 Nov 2025 #215',
      rates: [
        {
          country: 'Australia',
          currency: 'dollar',
          amount: 1,
          code: 'AUD',
          rate: 14.632,
        },
        {
          country: 'Brazil',
          currency: 'real',
          amount: 1,
          code: 'BRL',
          rate: 4.234,
        },
      ],
    });
  });

  it('should handle rates with amount > 1', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Japan|yen|100|JPY|15.123
Australia|dollar|0|AUD|14.632
`;

    const result = parseCnbDailyText(text);

    // Should only include rate with amount > 1
    expect(result.rates).toHaveLength(1);
    expect(result.rates[0]).toEqual({
      country: 'Japan',
      currency: 'yen',
      amount: 100,
      code: 'JPY',
      rate: 15.123,
    });
    // Verify that amount is actually > 1
    expect(result.rates[0].amount).toBeGreaterThan(1);
  });

  it('should handle comma as decimal separator', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14,632
`;

    const result = parseCnbDailyText(text);

    expect(result.rates[0].rate).toBe(14.632);
  });

  it('should handle Windows line endings (CRLF)', () => {
    const text = `03 Nov 2025 #215\r\nCountry|Currency|Amount|Code|Rate\r\nAustralia|dollar|1|AUD|14.632\r\n`;

    const result = parseCnbDailyText(text);

    expect(result.asOf).toBe('03 Nov 2025 #215');
    expect(result.rates).toHaveLength(1);
  });

  it('should handle Mac line endings (CR)', () => {
    const text = `03 Nov 2025 #215\rCountry|Currency|Amount|Code|Rate\rAustralia|dollar|1|AUD|14.632\r`;

    const result = parseCnbDailyText(text);

    expect(result.asOf).toBe('03 Nov 2025 #215');
    expect(result.rates).toHaveLength(1);
  });

  it('should skip empty lines', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate

Australia|dollar|1|AUD|14.632

Brazil|real|1|BRL|4.234
`;

    const result = parseCnbDailyText(text);

    expect(result.rates).toHaveLength(2);
  });

  it('should skip lines with invalid number of parts', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.632
Invalid|Line
Brazil|real|1|BRL|4.234
`;

    const result = parseCnbDailyText(text);

    expect(result.rates).toHaveLength(2);
    expect(result.rates[0].code).toBe('AUD');
    expect(result.rates[1].code).toBe('BRL');
  });

  it('should skip lines with invalid numeric values', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Australia|dollar|invalid|AUD|14.632
Brazil|real|1|BRL|invalid
`;

    const result = parseCnbDailyText(text);

    expect(result.rates).toHaveLength(0);
  });

  it('should trim whitespace from fields', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
  Australia  |  dollar  |  1  |  AUD  |  14.632  
`;

    const result = parseCnbDailyText(text);

    expect(result.rates[0]).toEqual({
      country: 'Australia',
      currency: 'dollar',
      amount: 1,
      code: 'AUD',
      rate: 14.632,
    });
  });

  it('should handle case-insensitive header matching', () => {
    const text = `03 Nov 2025 #215
COUNTRY|CURRENCY|AMOUNT|CODE|RATE
Australia|dollar|1|AUD|14.632
`;

    const result = parseCnbDailyText(text);

    expect(result.rates).toHaveLength(1);
  });

  it('should return empty rates array when only header and date are present', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate`;

    const result = parseCnbDailyText(text);

    expect(result.asOf).toBe('03 Nov 2025 #215');
    expect(result.rates).toEqual([]);
  });

  it('should throw error for too few lines (missing header)', () => {
    const text = `03 Nov 2025 #215`;

    expect(() => parseCnbDailyText(text)).toThrow('Unexpected CNB response format: too few lines');
  });

  it('should throw error for invalid header format', () => {
    const text = `03 Nov 2025 #215
Invalid|Header|Format
Australia|dollar|1|AUD|14.632
`;

    expect(() => parseCnbDailyText(text)).toThrow('Unexpected CNB header format');
  });

  it('should handle real-world example with multiple currencies', () => {
    const text = `03 Nov 2025 #215
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.632
Brazil|real|1|BRL|4.234
Bulgaria|lev|1|BGN|12.456
Canada|dollar|1|CAD|16.789
China|renminbi|1|CNY|3.123
Denmark|krone|1|DKK|3.456
`;

    const result = parseCnbDailyText(text);

    expect(result.asOf).toBe('03 Nov 2025 #215');
    expect(result.rates).toHaveLength(6);
    expect(result.rates.map(r => r.code)).toEqual(['AUD', 'BRL', 'BGN', 'CAD', 'CNY', 'DKK']);
  });
});

