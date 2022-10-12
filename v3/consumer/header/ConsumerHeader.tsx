import { Text, View } from 'react-native';
import { useContextUser } from '../../api/auth/AuthContext';

import { texts } from '../../common/styles/fonts';
import { padding4 } from '../../common/styles/padding';
import { ConsumerCarousel } from './carousel/ConsumerCarousel';
import { LocationBar } from './location-bar/LocationBar';

export const ConsumerHeader = () => {
  // context
  const user = useContextUser();
  // UI
  return (
    <View style={{ flex: 1, padding: padding4 }}>
      <Text style={{ ...texts.md }}>{`Olá ✌️ ${user?.email ?? ''}`}</Text>
      <LocationBar />
      <View style={{ flex: 1 }} />
      <ConsumerCarousel />
      <View style={{ flex: 1 }} />
    </View>
  );
};
