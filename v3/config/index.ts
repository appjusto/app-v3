import Constants from 'expo-constants';
import { Extra } from './types';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getManifestExtra = () => Constants.manifest!.extra as Extra;
export const getFlavor = () => getManifestExtra().flavor;
