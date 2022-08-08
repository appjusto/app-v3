import { Pressable, Text, View, ViewProps } from 'react-native';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding0, padding2, padding4 } from '../styles/padding';

interface Props extends ViewProps {
  checked: boolean;
  title?: string;
  variant?: 'square' | 'circle';
  onPress: () => void;
}

export const CheckButton = ({
  checked,
  title,
  variant = 'square',
  onPress,
  style,
  ...props
}: Props) => {
  return (
    <Pressable onPress={onPress} hitSlop={10}>
      {({ pressed }) => (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={[
              {
                width: 24,
                height: 24,
                padding: padding0,
                borderWidth: 2,
                borderRadius: variant === 'square' ? 4 : 12,
                backgroundColor: colors.white,
              },
              style,
            ]}
            {...props}
          >
            {checked && (
              <View
                style={{
                  backgroundColor: colors.green500,
                  borderRadius: variant === 'square' ? 4 : 12,
                  width: 16,
                  height: 16,
                }}
              />
            )}
          </View>
          {title ? (
            <Text
              style={{
                ...texts.xs,
                marginLeft: padding2,
                marginRight: padding4,
              }}
            >
              {title}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
};
