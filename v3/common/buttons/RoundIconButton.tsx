import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { colors } from '../styles/colors';

interface Props extends ViewProps {
  icon: React.ReactNode;
  onPress?: () => Promise<FirebaseAuthTypes.UserCredential>;
  disabled?: boolean;
}

export const RoundIconButton = ({ icon, onPress, disabled = false }: Props) => {
  return (
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
      <Pressable onPress={onPress} disabled={disabled}>
        {icon}
      </Pressable>
    </View>
  );
};
