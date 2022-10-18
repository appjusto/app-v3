import firebase from '@react-native-firebase/app';
import { getFirebaseRegion } from '../../config';

export const getDeleteAccount = () =>
  firebase.app().functions(getFirebaseRegion()).httpsCallable('deleteAccount');
