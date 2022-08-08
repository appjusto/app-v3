import { initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, FirebaseStorage, getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import { Extra } from '../config/types';
import AuthApi from './auth/AuthApi';

export default class Api {
  private authentication: Auth;
  private firestore: Firestore;
  private functions: Functions;
  private storage: FirebaseStorage;

  private auth: AuthApi;

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
  }

  getAuth() {
    return this.auth;
  }
}
