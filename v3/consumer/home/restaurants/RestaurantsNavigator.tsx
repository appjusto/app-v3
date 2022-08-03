import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Restaurants } from './Restaurants';

const Stack = createNativeStackNavigator();
export const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Restaurants" component={Restaurants} />
    </Stack.Navigator>
  );
};
