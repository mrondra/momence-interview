import { fetchText, validateWithZod } from '../http';
import { parseCnbDailyText } from './parser';
import { CnbDailyResponseSchema } from './schema';
import type { CnbDailyResponse } from './types';

const CNB_DAILY_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export async function getCnbDailyRates(): Promise<CnbDailyResponse> {
  const body = await fetchText(CNB_DAILY_URL);
  const parsed = parseCnbDailyText(body);
  return validateWithZod(CnbDailyResponseSchema, parsed);
}

