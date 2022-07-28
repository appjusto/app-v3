import { Flavor } from '@appjusto/types';
import { Asset } from 'expo-asset';

export const loadImages = async (flavor: Flavor) => {
  if (flavor === 'courier') await Asset.loadAsync([]);
};
