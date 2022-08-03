import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileHome } from './ProfileHome';

const Stack = createNativeStackNavigator();
export const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
    </Stack.Navigator>
  );
};
