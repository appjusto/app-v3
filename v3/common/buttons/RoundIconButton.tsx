import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { colors } from '../styles/colors';

interface Props extends ViewProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export const RoundIconButton = ({ icon, onPress, disabled = false }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: colors.white }}
      style={({ pressed }) => pressed && { opacity: 0.6 }}
    >
      <View
        style={{
          height: 52,
          width: 52,
          borderRadius: 26,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.grey500,
          backgroundColor: colors.grey50,
        }}
      >
        {icon}
      </View>
    </Pressable>
  );
};
