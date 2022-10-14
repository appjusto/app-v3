// import { initializeApp } from 'firebase/app';
// import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

import { Platform } from 'react-native';
import { getManifestExtra } from '../common/config';
import AuthApi from './auth/AuthApi';
import ProfileApi from './profile/ProfileApi';

export default class Api {
  // private authentication: FirebaseAuthTypes.
  // private firestore: Firestore;
  // private functions: Functions;
  // private storage: FirebaseStorage;

  private auth: AuthApi;
  private profile: ProfileApi;

  constructor() {
    this.auth = new AuthApi();
    this.profile = new ProfileApi(this.auth);
  }

  async init() {
    const extra = getManifestExtra();
    const emulated = extra.firebase.emulator.enabled && extra.firebase.emulator.host;
    const apiKey =
      Platform.OS === 'android' ? extra.firebase.apiKeyAndroid : extra.firebase.apiKeyiOS;
    await firebase.initializeApp({ ...extra.firebase, apiKey });
    // this.authentication = getAuth(app);
    // this.authentication.languageCode = 'pt';
    // this.firestore = getFirestore(app);
    // this.functions = getFunctions(app, extra.firebase.region);
    // this.storage = getStorage(app);
    if (emulated && extra.firebase.emulator.host) {
      const host = extra.firebase.emulator.host;
      auth().useEmulator(`http://${host}:9099`);
      // connectAuthEmulator(this.authentication, `http://${host}:9099`);
      firestore().useEmulator(host, 8080);
      // connectFirestoreEmulator(this.firestore, host, 8080);
      functions().useEmulator(host, 5001);
      // connectFunctionsEmulator(this.functions, host, 5001);
      storage().useEmulator(host, 9199);
      // connectStorageEmulator(this.storage, host, 9199);
    }
  }

  getAuth() {
    return this.auth;
  }

  getProfile() {
    return this.profile;
  }
}

export const api = new Api();
api
  .init()
  .then(() => null)
  .catch(console.error);
