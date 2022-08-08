import { ActivityIndicator, Pressable, Text, View, ViewProps } from 'react-native';
import { borderRadius1 } from '../styles/borders';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding3 } from '../styles/padding';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'transparent';

interface Props extends ViewProps {
  title: string;
  variant?: ButtonVariant;
  activityIndicator?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const getBackgroundColor = (variant: ButtonVariant, disabled: boolean) => {
  if (disabled) return colors.grey500;
  if (variant === 'primary') return colors.green500;
  if (variant === 'secondary') return colors.white;
  if (variant === 'danger') return colors.white;
  if (variant === 'transparent') return undefined;
  throw new Error('variant inválida');
};

const getBorderColor = (variant: ButtonVariant, disabled: boolean) => {
  if (disabled) return colors.grey500;
  if (variant === 'primary') return colors.green500;
  if (variant === 'secondary') return colors.black;
  if (variant === 'transparent') return colors.white;
  throw new Error('variant inválida');
};

const getTextColor = (variant: ButtonVariant, disabled: boolean) => {
  if (disabled) return colors.white;
  if (variant === 'primary') return colors.black;
  if (variant === 'secondary') return colors.black;
  if (variant === 'transparent') return colors.white;
  throw new Error('variant inválida');
};

export const RectButton = ({
  title,
  variant = 'primary',
  disabled = false,
  activityIndicator = false,
  style,
  onPress,
  ...props
}: Props) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          style={[
            {
              paddingVertical: padding3,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              borderRadius: borderRadius1,
              backgroundColor: getBackgroundColor(variant, disabled ?? activityIndicator),
              borderColor: getBorderColor(variant, disabled ?? activityIndicator),
              borderWidth: 1,
              opacity: pressed ? 0.8 : 1,
            },
            style,
          ]}
          {...props}
        >
          {!activityIndicator ? (
            <Text style={{ ...texts.sm, color: getTextColor(variant, disabled) }}>{title}</Text>
          ) : (
            <ActivityIndicator
              size="small"
              color={variant === 'secondary' ? colors.black : colors.white}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
