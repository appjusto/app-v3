import { View } from 'react-native';
import { screens } from '../../common/styles';
import { ConsumerHeader } from '../header/ConsumerHeader';
import { ConsumerWelcomeCitySelector } from './city-selector/ConsumerWelcomeCitySelector';

export const ConsumerWelcomeScreen = () => {
  return (
    <View style={{ ...screens.default }}>
      <ConsumerHeader />
      <ConsumerWelcomeCitySelector />
    </View>
  );
};
