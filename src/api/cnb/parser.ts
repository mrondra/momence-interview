import { getNumber } from '../../utils/getNumber';
import type { CnbDailyResponse } from './types';

export function parseCnbDailyText(text: string): CnbDailyResponse {
  // Normalize line endings and trim trailing whitespace
  const lines = text.replace(/\r\n?/g, '\n').trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Unexpected CNB response format: too few lines');
  }

  const asOf = lines[0].trim();
  // Expected header line 1: e.g., "03 Nov 2025 #215"
  // Expected header line 2: e.g., "Country|Currency|Amount|Code|Rate"
  const header = lines[1].trim();
  if (!/Country\|Currency\|Amount\|Code\|Rate/i.test(header)) {
    throw new Error('Unexpected CNB header format');
  }

  // If only header and date (no data rows), return empty rates array
  if (lines.length === 2) {
    return { asOf, rates: [] };
  }

  const rates: CnbDailyResponse['rates'] = [];
  for (let i = 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split('|');
    if (parts.length !== 5) continue;

    const [country, currency, amountStr, code, rateStr] = parts.map(p => p.trim());

    // getNumber handles comma as decimal separator and returns 0 for invalid values
    const amount = getNumber(amountStr, 0);
    const rate = getNumber(rateStr, 0);

    // Skip invalid or non-positive values, amount must be integer
    if (amount <= 0 || rate <= 0 || !Number.isInteger(amount)) continue;

    rates.push({ country, currency, amount, code, rate });
  }

  return { asOf, rates };
}

