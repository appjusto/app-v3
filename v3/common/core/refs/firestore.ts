import { collection, doc, getFirestore } from 'firebase/firestore';

// platform
export const getPlatformCollection = () => collection(getFirestore(), 'platform');
// platform docs
export const getPlatformParamsDoc = () => doc(getPlatformCollection(), 'params');
export const getPlatformAccessDoc = () => doc(getPlatformCollection(), 'access');
export const getPlatformDataDoc = () => doc(getPlatformCollection(), 'data');
export const getPlatformLogsDoc = () => doc(getPlatformCollection(), 'logs');
// platform data sub collections
export const getBanksCollection = () => collection(getPlatformDataDoc(), 'banks');
// platform logs sub collections
export const getLoginsCollection = () => collection(getPlatformLogsDoc(), 'logins');
