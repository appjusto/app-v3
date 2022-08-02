import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IconGPS } from '../../../../../assets/consumer/svg/IconGPS';
import { PillButton } from '../../../../common/buttons/PillButton';
import { texts } from '../../../../common/styles/fonts';
import { padding2 } from '../../../../common/styles/padding';
import { getConsumerLocation } from '../../../store/selectors';

export const LocationBar = () => {
  const location = useSelector(getConsumerLocation);
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
