import { Text, View } from 'react-native';
import { IconGPS } from '../../../../../assets/consumer/svg/IconGPS';
import { PillButton } from '../../../../common/buttons/PillButton';
import { texts } from '../../../../common/styles/fonts';
import { padding2 } from '../../../../common/styles/padding';

export const LocationBar = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <IconGPS />
      <Text style={{ ...texts.xs, marginLeft: padding2 }}>Avenida Paulista, 1578</Text>
      <View style={{ flex: 1 }} />
      <PillButton title={'Alterar local'} onPress={() => console.log('press')} />
    </View>
  );
};
