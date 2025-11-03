export type CnbRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number; // CZK per `amount` of `code`
};

export type CnbDailyResponse = {
  asOf: string; // header date as provided by CNB
  rates: CnbRate[];
};

