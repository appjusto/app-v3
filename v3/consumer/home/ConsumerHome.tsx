import { View } from 'react-native';
import { screens } from '../../common/styles';
import { ConsumerHomeCitySelector } from './city-selector/ConsumerHomeCitySelector';
import { ConsumerHomeHeader } from './header/ConsumerHomeHeader';

export const ConsumerHome = () => {
  return (
    <View style={{ ...screens.default }}>
      <ConsumerHomeHeader />
      <ConsumerHomeCitySelector />
    </View>
  );
};
