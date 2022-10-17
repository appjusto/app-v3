import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions, { FirebaseFunctionsTypes } from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

import { getManifestExtra } from '../common/config';
import AuthApi from './auth/AuthApi';
import ProfileApi from './profile/ProfileApi';

export default class Api {
  private auth: AuthApi;
  private profile: ProfileApi;
  private functions: FirebaseFunctionsTypes.Module;

  constructor() {
    const extra = getManifestExtra();
    auth().languageCode = 'pt';
    this.functions = firebase.app().functions(extra.firebase.region);
    const emulated = extra.firebase.emulator.enabled && extra.firebase.emulator.host;
    if (emulated && extra.firebase.emulator.host) {
      const host = extra.firebase.emulator.host;
      auth().useEmulator(`http://${host}:9099`);
      firestore().useEmulator(host, 8080);
      functions().useEmulator(host, 5001);
      storage().useEmulator(host, 9199);
      // TODO: firebase.app().storage('gs://default-bucket')
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

export const api = new Api();
