import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginNavigator } from '../common/login/LoginNavigator';
import { ConsumerHomeNavigator } from './home/ConsumerHomeNavigator';
import { ConsumerWelcome } from './welcome/ConsumerWelcome';

const Stack = createNativeStackNavigator();
export const ConsumerMainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={ConsumerWelcome} options={{ headerShown: false }} />
      <Stack.Screen name="HomeNavigator" component={ConsumerHomeNavigator} />
      <Stack.Screen
        name="LoginNavigator"
        component={LoginNavigator}
        options={{ title: 'Entrar no AppJusto' }}
      />
    </Stack.Navigator>
  );
};
