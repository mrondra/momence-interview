import { z } from 'zod';
import type { CnbRate, CnbDailyResponse } from './types';

export const CnbRateSchema = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number().int().positive(),
  code: z.string().min(3).max(3),
  rate: z.number().positive(),
}) satisfies z.ZodType<CnbRate>;

export const CnbDailyResponseSchema = z.object({
  asOf: z.string().min(1),
  rates: z.array(CnbRateSchema).nonempty(),
}) satisfies z.ZodType<CnbDailyResponse>;

