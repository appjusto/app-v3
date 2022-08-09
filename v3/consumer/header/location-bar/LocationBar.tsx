import { Text, View } from 'react-native';
import { PillButton } from '../../../common/buttons/PillButton';
import { texts } from '../../../common/styles/fonts';
import { padding2 } from '../../../common/styles/padding';
import { useLocation } from '../../context/ConsumerContext';
import { IconGPS } from './assets/IconGPS';

export const LocationBar = () => {
  const location = useLocation();
  if (!location) return null;
  return (
    <View style={{ flexDirection: 'row' }}>
      <IconGPS />
      <Text style={{ ...texts.xs, marginLeft: padding2 }}>{location.title}</Text>
      <View style={{ flex: 1 }} />
      <PillButton title={'Alterar local'} onPress={() => console.log('press')} />
    </View>
  );
};
