import { getFunctions, httpsCallable } from 'firebase/functions';

export const getDeleteAccountCallable = () => httpsCallable(getFunctions(), 'deleteAccount');
