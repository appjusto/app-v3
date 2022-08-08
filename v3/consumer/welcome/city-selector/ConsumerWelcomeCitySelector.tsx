import { useNavigation } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import { ImageBackground, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RectButton } from '../../../common/buttons/RectButton';
import { borderRadius2 } from '../../../common/styles/borders';
import { colors } from '../../../common/styles/colors';
import { texts } from '../../../common/styles/fonts';
import { padding2, padding4, padding6 } from '../../../common/styles/padding';
import { useConsumerAppDispatch } from '../../store';
import { updateLocation } from '../../store/profile/actions';
import { getConsumerLocation } from '../../store/profile/selectors';

export const ConsumerWelcomeCitySelector = () => {
  // context
  const navigation = useNavigation();
  // redux
  const location = useSelector(getConsumerLocation);
  const dispatch = useConsumerAppDispatch();
  // assets
  const [assets] = useAssets([require('./assets/background.jpg')]);
  if (location) return null;
  if (!assets) return null;
  const [background] = assets;
  return (
    <ImageBackground
      source={{ uri: background.uri }}
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: padding4,
      }}
    >
      <View
        style={{ padding: padding6, borderRadius: borderRadius2, backgroundColor: colors.black }}
      >
        <Text style={{ ...texts.x2s, ...texts.bold, color: colors.yellow }}>
          CHEGOU AGORA POR AQUI?
        </Text>
        <Text style={{ ...texts.lg, color: colors.white }}>Diz pra gente a sua cidade:</Text>
        <RectButton
          style={{ marginTop: padding4 }}
          title="Estou em São Paulo"
          onPress={() => {
            dispatch(
              updateLocation({
                title: 'Avenida Paulista, 1578',
                coordinates: {
                  latitude: -23.561433653472772,
                  longitude: -46.65590336017428,
                },
              })
            );
          }}
        />
        <RectButton
          style={{ marginTop: padding2 }}
          variant="secondary"
          title="Estou em outra cidade"
          onPress={() => navigation.navigate('HomeNavigator')}
        />
        <RectButton
          style={{ marginTop: padding2 }}
          variant="transparent"
          title="Acessar como visitante"
          onPress={() => navigation.navigate('LoginNavigator')}
        />
      </View>
    </ImageBackground>
  );
};
