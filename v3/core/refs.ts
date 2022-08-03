import { collection, doc, getFirestore } from 'firebase/firestore';

export const getPlatformParamsDoc = () => doc(getFirestore(), 'platform/params');
export const getPlatformAccessDoc = () => doc(getFirestore(), 'platform/access');
export const getBanksCollection = () => collection(getFirestore(), 'platform/data/banks');
