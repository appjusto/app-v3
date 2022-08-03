import { View } from 'react-native';
import { usePlatformParams } from '../../api/platform/usePlatformParams';
import { screens } from '../../common/styles';
import { ConsumerHomeCitySelector } from './city-selector/ConsumerHomeCitySelector';
import { ConsumerHomeHeader } from './header/ConsumerHomeHeader';

export const ConsumerHome = () => {
  const banks = usePlatformParams();
  console.log(banks);
  return (
    <View style={{ ...screens.default }}>
      <ConsumerHomeHeader />
      <ConsumerHomeCitySelector />
    </View>
  );
};
