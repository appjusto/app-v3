import firestore from '@react-native-firebase/firestore';
import { getFlavor } from '../../config';

// profile
export const getProfileCollection = () => {
  let collection: string | null = null;
  if (getFlavor() === 'consumer') collection = 'consumers';
  if (getFlavor() === 'courier') collection = 'couriers';
  if (getFlavor() === 'business') collection = 'managers';
  if (!collection) throw new Error('getProfileCollection(): getFlavor() inválido.');
  return firestore().collection(collection);
};

export const getProfile = (id: string) => getProfileCollection().doc(id);

// platform
export const getPlatformCollection = () => firestore().collection('platform');
export const getPlatformParamsDoc = () => getPlatformCollection().doc('params');
export const getPlatformAccessDoc = () => getPlatformCollection().doc('access');
// platfomrm data
export const getPlatformDataDoc = () => getPlatformCollection().doc('data');
export const getBanksCollection = () => getPlatformDataDoc().collection('banks');
// platform logs
export const getPlatformLogsDoc = () => getPlatformCollection().doc('logs');
export const getLoginsCollection = () => getPlatformLogsDoc().collection('logins');
