import Constants from 'expo-constants';
import { Extra } from './types';

export const getManifestExtra = () => Constants.expoConfig?.extra as Extra;
export const getFlavor = () => getManifestExtra().flavor;
export const getEnv = () => getManifestExtra().environment;

// firebase
export const getFirebaseRegion = () => getManifestExtra().firebase.region;
export const getFirebaseWebClientId = () => getManifestExtra().firebase.webClientId;
