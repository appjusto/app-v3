import { Text, View } from 'react-native';
import { texts } from '../../../common/styles/fonts';
import { HomeCarousel } from './carousel/HomeCarousel';
import { LocationBar } from './location-bar/LocationBar';

export const HomeHeader = () => {
  return (
    <View>
      <Text style={{ ...texts.md }}>Olá ✌️</Text>
      <LocationBar />
      <HomeCarousel />
    </View>
  );
};
