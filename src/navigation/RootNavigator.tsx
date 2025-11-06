import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CnbRatesList } from '../components/CnbRatesList';
import { TabRoute } from './tabRoutes';
import { createTabBarIcon } from './createTabBarIcon';
import { CurrencyConverter } from '../components/CurrencyConverter';

const Tab = createBottomTabNavigator();

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
          component={CnbRatesList}
          options={{ tabBarLabel: 'Kurzy' }}
        />
        <Tab.Screen
          name={TabRoute.Conversion}
          component={CurrencyConverter}
          options={{ tabBarLabel: 'Konverze' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
