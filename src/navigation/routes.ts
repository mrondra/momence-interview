import { TabRoute } from './tabRoutes';

export const tabIconNames: Record<TabRoute, { focused: string; unfocused: string }> = {
  [TabRoute.Rates]: { focused: 'trending-up', unfocused: 'trending-up' },
  [TabRoute.Conversion]: { focused: 'swap-horizontal', unfocused: 'swap-horizontal' },
};

// Fallback icon when a route is missing in tabIconNames
export const fallbackIcon = { focused: 'ellipse', unfocused: 'ellipse' };
