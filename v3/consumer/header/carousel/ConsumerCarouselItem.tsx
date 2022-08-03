import { Text, View } from 'react-native';
import { borderRadius2 } from '../../../common/styles/borders';
import { colors } from '../../../common/styles/colors';
import { texts } from '../../../common/styles/fonts';
import { padding4, padding5 } from '../../../common/styles/padding';

interface Props {
  icon: string;
  title: string;
  text: string;
}

export const ConsumerCarouselItem = ({ icon, title, text }: Props) => {
  return (
    <View
      style={{
        padding: padding5,
        backgroundColor: colors.grey50,
        width: 280,
        borderRadius: borderRadius2,
        marginHorizontal: padding4,
      }}
    >
      <Text style={{ ...texts.md }}>{icon}</Text>
      <Text style={{ ...texts.md, marginTop: padding4 }}>{title}</Text>
      <Text style={{ ...texts.md, color: colors.grey700 }}>{text}</Text>
    </View>
  );
};
