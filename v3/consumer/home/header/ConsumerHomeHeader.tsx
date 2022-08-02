import { Text, View } from 'react-native';
import { texts } from '../../../common/styles/fonts';
import { padding4 } from '../../../common/styles/padding';
import { ConsumerHomeCarousel } from './carousel/ConsumerHomeCarousel';
import { LocationBar } from './location-bar/LocationBar';

export const ConsumerHomeHeader = () => {
  return (
    <View style={{ padding: padding4 }}>
      <Text style={{ ...texts.md }}>Olá ✌️</Text>
      <LocationBar />
      <View style={{ flex: 1 }} />
      <ConsumerHomeCarousel />
      <View style={{ flex: 1 }} />
    </View>
  );
};
