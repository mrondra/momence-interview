import { TabRoute } from './routeNames';

export const tabIconNames: Record<TabRoute, { focused: string; unfocused: string }> = {
  [TabRoute.Rates]: { focused: 'trending-up', unfocused: 'trending-up' },
  [TabRoute.Conversion]: { focused: 'swap-horizontal', unfocused: 'swap-horizontal' },
};

export const fallbackIcon = { focused: 'ellipse', unfocused: 'ellipse' };

