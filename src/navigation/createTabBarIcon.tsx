import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabRoute } from './routes/routeNames';
import { tabIconNames, fallbackIcon } from './routes/iconMappings';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export type TabBarIconRenderer = NonNullable<BottomTabNavigationOptions['tabBarIcon']>;

export const createTabBarIcon = (routeName: TabRoute | string): TabBarIconRenderer => ({
  focused,
  color,
  size,
}) => {
  const mapping = tabIconNames[routeName as TabRoute] ?? fallbackIcon;
  const iconName = focused ? mapping.focused : mapping.unfocused;
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};
