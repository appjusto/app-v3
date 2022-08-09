import { initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, FirebaseStorage, getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import { getManifestExtra } from '../common/config';
import { Extra } from '../common/config/types';
import AuthApi from './auth/AuthApi';
import ProfileApi from './profile/ProfileApi';

export default class Api {
  private authentication: Auth;
  private firestore: Firestore;
  private functions: Functions;
  private storage: FirebaseStorage;

  private auth: AuthApi;
  private profile: ProfileApi;

  constructor(extra: Extra) {
    const emulated = extra.firebase.emulator.enabled && extra.firebase.emulator.host;
    const apiKey =
      Platform.OS === 'android' ? extra.firebase.apiKeyAndroid : extra.firebase.apiKeyiOS;
    const app = initializeApp({ ...extra.firebase, apiKey });
    this.authentication = getAuth(app);
    this.authentication.languageCode = 'pt';
    this.firestore = getFirestore(app);
    this.functions = getFunctions(app, extra.firebase.region);
    this.storage = getStorage(app);
    if (emulated && extra.firebase.emulator.host) {
      const host = extra.firebase.emulator.host;
      connectAuthEmulator(this.authentication, `http://${host}:9099`);
      connectFirestoreEmulator(this.firestore, host, 8080);
      connectFunctionsEmulator(this.functions, host, 5001);
      connectStorageEmulator(this.storage, host, 9199);
    }

    this.auth = new AuthApi();
    this.profile = new ProfileApi(this.auth);
  }

  getAuth() {
    return this.auth;
  }

  getProfile() {
    return this.profile;
  }
}

export const api = new Api(getManifestExtra());
