import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './Login';

const Stack = createNativeStackNavigator();
export const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
