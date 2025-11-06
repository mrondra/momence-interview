export enum TabRoute {
  Rates = 'Rates',
  Conversion = 'Conversion',
}

export const ROUTES = {
  RATES: TabRoute.Rates,
  CONVERSION: TabRoute.Conversion,
} as const;
