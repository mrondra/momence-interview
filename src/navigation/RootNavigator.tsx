import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import { CnbRatesList } from '../components/CnbRatesList';
import { TabRoute } from './tabRoutes';
import { createTabBarIcon } from './createTabBarIcon';

const Tab = createBottomTabNavigator();

function SecondScreen() {
  return <Text style={styles.text}>Druhá záložka</Text>;
}

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
          component={SecondScreen}
          options={{ tabBarLabel: 'Konverze' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 18, textAlign: 'center', marginTop: 32 },
});
