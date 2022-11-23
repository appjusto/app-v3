import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { colors } from '../../common/styles/colors';
import { ConsumerMainNavParamList } from '../types';
import { HistoryNavigator } from './history/HistoryNavigator';
import { P2PNavigator } from './p2p/P2PNavigator';
import { ProfileNavigator } from './profile/ProfileNavigator';
import { RestaurantsNavigator } from './restaurants/RestaurantsNavigator';
import { ConsumerHomeNavParamList } from './types';

type ScreenNavigationProp = NativeStackNavigationProp<ConsumerMainNavParamList, 'HomeNavigator'>;

const Tab = createBottomTabNavigator<ConsumerHomeNavParamList>();
export const ConsumerHomeNavigator = () => {
  // context
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="RestaurantsNavigator"
        component={RestaurantsNavigator}
        options={{
          title: 'Restaurantes',
          tabBarLabelStyle: { color: colors.black },
          tabBarIcon: () => <Text>🍕</Text>,
        }}
      />
      <Tab.Screen
        name="P2PNavigator"
        component={P2PNavigator}
        options={{
          title: 'Encomendas',
          tabBarLabelStyle: { color: colors.black },
          tabBarIcon: () => <Text>📦</Text>,
        }}
      />
      <Tab.Screen
        name="HistoryNavigator"
        component={HistoryNavigator}
        options={{
          title: 'Pedidos',
          tabBarLabelStyle: { color: colors.black },
          tabBarIcon: () => <Text>📃</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          title: 'Perfil',
          tabBarLabelStyle: { color: colors.black },
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
