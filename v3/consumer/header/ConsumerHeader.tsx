import { Text, View } from 'react-native';
import { texts } from '../../common/styles/fonts';
import { padding4 } from '../../common/styles/padding';
import { ConsumerCarousel } from './carousel/ConsumerCarousel';
import { LocationBar } from './location-bar/LocationBar';

export const ConsumerHeader = () => {
  return (
    <View style={{ flex: 1, padding: padding4 }}>
      <Text style={{ ...texts.md }}>Olá ✌️</Text>
      <LocationBar />
      <View style={{ flex: 1 }} />
      <ConsumerCarousel />
      <View style={{ flex: 1 }} />
    </View>
  );
};
