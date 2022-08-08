import React from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { AuthMode } from '../../api/auth/AuthApi';
import { useAuthApi } from '../../api/context/ApiContext';
import { AppJustoLogo } from '../../assets/AppJustoLogo';
import { CheckButton } from '../buttons/CheckButton';
import { PillButton } from '../buttons/PillButton';
import { RectButton } from '../buttons/RectButton';
import { SwitchButton, SwitchPosition } from '../buttons/SwitchButton';
import { LabeledInput } from '../inputs/LabeledInput';
import { phoneFormatter, phoneMask } from '../inputs/pattern-input/formatters';
import { numbersOnlyParser } from '../inputs/pattern-input/parsers';
import { PatternInput } from '../inputs/PatternInput';
import { screens } from '../styles';
import { texts } from '../styles/fonts';
import { padding4, padding6 } from '../styles/padding';
import { useLogin } from './useLogin';

export const LoginScreen = () => {
  // context
  const auth = useAuthApi();
  // state
  const [position, setPosition] = React.useState<SwitchPosition>('left');
  const action = position === 'left' ? 'login' : 'create-account';
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('pdandradeb@gmail.com');
  const [password, setPassword] = React.useState('');
  const [authMode, setAuthMode] = React.useState<AuthMode>(auth.getDefaultAuthMode());
  // const [authMode, setAuthMode] = React.useState<AuthMode>('phone');
  const [acceptedTerms, setAcceptTerms] = React.useState(false);
  const { login, loading, disabled } = useLogin(authMode, email, password, phone, acceptedTerms);
  // handlers
  const submitHandler = () => {
    if (action === 'login') {
      void (async () => {
        await login();
      })();
    }
  };
  // UI
  return (
    <View style={{ ...screens.default, padding: padding4 }}>
      <Pressable
        onPressIn={() => Keyboard.dismiss()}
        delayLongPress={2000}
        onLongPress={() =>
          setAuthMode((current) =>
            current === 'phone' ? 'passwordless' : current === 'passwordless' ? 'password' : 'phone'
          )
        }
      >
        <AppJustoLogo />
      </Pressable>
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
        {authMode === 'passwordless' || authMode === 'password' ? (
          <>
            <LabeledInput
              style={{ marginTop: padding6 }}
              title={action === 'login' ? 'Fazer login' : 'Criar conta'}
              placeholder="Digite seu e-mail"
              value={email}
              autoComplete="email"
              keyboardType="email-address"
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
            />
            {authMode === 'password' ? (
              <LabeledInput
                style={{ marginTop: padding4 }}
                title="Sua senha"
                placeholder="Digite sua senha"
                value={password}
                keyboardType="visible-password"
                blurOnSubmit
                autoCapitalize="none"
                onChangeText={setPassword}
              />
            ) : null}
          </>
        ) : (
          <PatternInput
            style={{ marginTop: padding6 }}
            title={action === 'login' ? 'Fazer login' : 'Criar conta'}
            value={phone}
            placeholder={'Número com DDD'}
            mask={phoneMask}
            parser={numbersOnlyParser}
            formatter={phoneFormatter}
            keyboardType="number-pad"
            blurOnSubmit
            onChangeText={setPhone}
          />
        )}
        <View
          style={{ marginTop: padding6, flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <CheckButton
            title="Aceito os termos de uso do app"
            checked={acceptedTerms}
            onPress={() => setAcceptTerms((value) => !value)}
          />
          <PillButton title="Ler termos" onPress={() => null} />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <RectButton
        title="Entrar no AppJusto"
        onPress={submitHandler}
        disabled={disabled}
        activityIndicator={loading}
      />
    </View>
  );
};
