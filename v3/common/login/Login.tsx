import React from 'react';
import { Text, View } from 'react-native';
import { AppJustoLogo } from '../../assets/AppJustoLogo';
import { RectButton } from '../buttons/RectButton';
import { SwitchButton, SwitchPosition } from '../buttons/SwitchButton';
import DefaultInput from '../inputs/DefaultInput';
import { screens } from '../styles';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding4, padding6 } from '../styles/padding';

export const Login = () => {
  const [position, setPosition] = React.useState<SwitchPosition>('left');
  return (
    <View style={{ ...screens.default, padding: padding4 }}>
      <AppJustoLogo />
      <View style={{ flex: 1 }} />
      <Text style={{ ...texts.x2l }}>Melhor para entregadores, restaurantes e consumidores</Text>
      <View style={{ flex: 1 }} />
      <View>
        <SwitchButton
          leftIcon="👤"
          leftText="Fazer login"
          rightIcon="🌱"
          rightText="Criar conta"
          position={position}
          onToggle={(value) => setPosition(value)}
        />
        <DefaultInput
          style={{ marginTop: padding6 }}
          title="Fazer login"
          placeholder="Digite seu e-mail"
        />
        <Text style={{ marginTop: padding6, ...texts.md, color: colors.grey700 }}>
          Ao utilizar o AppJusto, você está aceitando os termos de uso do app
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <RectButton title="Entrar no AppJusto" onPress={() => null} />
    </View>
  );
};
