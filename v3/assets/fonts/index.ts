import { Barlow_500Medium, Barlow_700Bold } from '@expo-google-fonts/barlow';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    Barlow_500Medium,
    Barlow_700Bold,
    ...Feather.font,
    ...MaterialIcons.font,
  });
};
