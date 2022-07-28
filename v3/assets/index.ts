import { Flavor } from '@appjusto/types';
import { loadFonts } from './fonts';
import { loadImages } from './images';

export const loadAssets = async (flavor: Flavor) => {
  await loadFonts();
  await loadImages(flavor);
};
