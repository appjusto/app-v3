import { Pressable, PressableProps, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { padding1, padding3 } from '../styles/padding';

interface Props extends PressableProps {
  title: string;
}

export const PillButton = ({ title, ...props }: Props) => {
  return (
    <Pressable {...props} hitSlop={10}>
      {({ pressed }) => (
        <View
          style={{
            paddingHorizontal: padding3,
            paddingVertical: padding1,
            backgroundColor: colors.yellow,
            opacity: pressed ? 0.8 : 1,
            borderRadius: 24,
          }}
        >
          <Text>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};
