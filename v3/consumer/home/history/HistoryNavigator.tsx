import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryHome } from './HistoryHome';

const Stack = createNativeStackNavigator();
export const HistoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryHome" component={HistoryHome} />
    </Stack.Navigator>
  );
};
