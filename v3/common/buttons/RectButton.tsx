import { Pressable, PressableProps, Text, View } from 'react-native';
import { borderRadius1 } from '../styles/borders';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding3 } from '../styles/padding';

type ButtonVariant = 'primary' | 'secondary' | 'transparent';

interface Props extends PressableProps {
  title: string;
  variant?: ButtonVariant;
}

const getBackgroundColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return colors.green500;
  if (variant === 'secondary') return colors.white;
  if (variant === 'transparent') return undefined;
  throw new Error('variant inválida');
};

const getBorderColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return colors.green500;
  if (variant === 'secondary') return colors.black;
  if (variant === 'transparent') return colors.white;
  throw new Error('variant inválida');
};

const getTextColor = (variant: ButtonVariant) => {
  if (variant === 'primary') return colors.black;
  if (variant === 'secondary') return colors.black;
  if (variant === 'transparent') return colors.white;
  throw new Error('variant inválida');
};

export const RectButton = ({ title, variant = 'primary', ...props }: Props) => {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <View
          style={{
            paddingVertical: padding3,
            justifyContent: 'center',
            alignItems: 'center',
            height: 48,
            borderRadius: borderRadius1,
            backgroundColor: getBackgroundColor(variant),
            borderColor: getBorderColor(variant),
            borderWidth: 1,
            opacity: pressed ? 0.8 : 1,
          }}
        >
          <Text style={{ ...texts.sm, color: getTextColor(variant) }}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};
