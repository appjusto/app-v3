import Constants from 'expo-constants';
import { Extra } from './types';

export const getManifestExtra = (): Extra => Constants.manifest!.extra as Extra;
export const getFlavor = () => getManifestExtra().flavor;
