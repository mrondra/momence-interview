import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CnbRatesScreen } from '../screens/CnbRates/CnbRatesScreen';
import { CurrencyConverterScreen } from '../screens/CurrencyConverter/CurrencyConverterScreen';
import { TabRoute } from './routes/routeNames';
import { createTabBarIcon } from './createTabBarIcon';
import type { TabParamList } from './types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: createTabBarIcon(route.name),
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name={TabRoute.Rates}
          component={CnbRatesScreen}
          options={{ tabBarLabel: 'Kurzy' }}
        />
        <Tab.Screen
          name={TabRoute.Conversion}
          component={CurrencyConverterScreen}
          options={{ tabBarLabel: 'Konverze' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
