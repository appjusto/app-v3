import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { P2PHome } from './P2PHome';

const Stack = createNativeStackNavigator();
export const P2PNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="P2PHome" component={P2PHome} />
    </Stack.Navigator>
  );
};
