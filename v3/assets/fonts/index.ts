import * as Font from 'expo-font';

import { Feather, MaterialIcons } from '@expo/vector-icons';
const BarlowBold = require('../../../assets/fonts/Barlow-Bold.ttf');
const BarlowMedium = require('../../../assets/fonts/Barlow-Medium.ttf');

export const loadFonts = async () => {
  await Font.loadAsync({
    BarlowMedium,
    BarlowBold,
    ...Feather.font,
    ...MaterialIcons.font,
  });
};
