import React from 'react';
import { Keyboard, Pressable, ScrollView, Text, View } from 'react-native';
import { AppJustoLogo } from '../../assets/AppJustoLogo';
import { AppleIcon } from '../../assets/AppleIcon';
import { FacebookIcon } from '../../assets/FacebookIcon';
import { GoogleIcon } from '../../assets/GoogleIcon';
import { LoginScreenIllustration } from '../../assets/LoginScreenIllutration';
import { CheckButton } from '../buttons/CheckButton';
import { PillButton } from '../buttons/PillButton';
import { RectButton } from '../buttons/RectButton';
import { RoundIconButton } from '../buttons/RoundIconButton';
import { SwitchPosition } from '../buttons/SwitchButton';
import { LabeledInput } from '../inputs/LabeledInput';
import { phoneFormatter, phoneMask } from '../inputs/pattern-input/formatters';
import { numbersOnlyParser } from '../inputs/pattern-input/parsers';
import { PatternInput } from '../inputs/PatternInput';
import { screens } from '../styles';
import { colors } from '../styles/colors';
import { texts } from '../styles/fonts';
import { padding4, padding6 } from '../styles/padding';
import { useLogin } from './useLogin';

export const LoginScreen = () => {
  // state
  const [position] = React.useState<SwitchPosition>('left');
  const action = position === 'left' ? 'login' : 'create-account';
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('pdandradeb@gmail.com');
  const [password, setPassword] = React.useState('');
  const [acceptedTerms, setAcceptTerms] = React.useState(false);
  const { login, authMode, setAuthMode, loading, disabled } = useLogin(
    email,
    password,
    phone,
    acceptedTerms
  );
  // handlers
  const submitHandler = () => {
    if (action === 'login') {
      login();
    }
  };
  // UI
  return (
    <ScrollView
      style={{ ...screens.default, padding: padding4 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Pressable
        onPressIn={() => Keyboard.dismiss()}
        delayLongPress={2000}
        onLongPress={() =>
          setAuthMode((current) =>
            current === 'phone' ? 'passwordless' : current === 'passwordless' ? 'password' : 'phone'
          )
        }
        style={{ marginTop: padding4 }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginBottom: padding4 }}>
            <LoginScreenIllustration />
          </View>
          <AppJustoLogo />
        </View>
      </Pressable>
      <Text style={{ ...texts.x2l, paddingHorizontal: padding4, marginTop: padding4 }}>
        Um delivery aberto, transparente e consciente
      </Text>
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
      <View>
        <Text style={{ textAlign: 'center', marginTop: padding4, color: colors.grey700 }}>
          Ou entre com
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: padding4,
          }}
        >
          <View style={{ width: '20%' }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <RoundIconButton
              icon={<GoogleIcon />}
              onPress={() => {
                setAuthMode('google');
                submitHandler();
              }}
            />
            <RoundIconButton icon={<FacebookIcon />} onPress={() => null} />
            <RoundIconButton icon={<AppleIcon />} onPress={() => null} />
          </View>
          <View style={{ width: '20%' }} />
        </View>
        <View
          style={{ marginTop: padding4, flexDirection: 'row', justifyContent: 'space-between' }}
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
    </ScrollView>
  );
};
