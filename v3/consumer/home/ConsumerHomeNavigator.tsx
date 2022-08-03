import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantsNavigator } from './restaurants/RestaurantsNavigator';

const Tab = createBottomTabNavigator();
export const ConsumerHomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RestaurantsNavigator"
        component={RestaurantsNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
