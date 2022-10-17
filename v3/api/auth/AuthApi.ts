import { DeleteAccountPayload } from '@appjusto/types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getFlavor, getManifestExtra } from '../../common/config';
import { getDeeplinkDomain, getFallbackDomain } from '../../common/config/domains';
import { getAppVersion } from '../../common/config/version';
import { getLoginsCollection } from '../../common/core/refs/firestore';
import { getDeleteAccountCallable } from '../../common/core/refs/functions';

GoogleSignin.configure({
  webClientId: getManifestExtra().firebase.webClientId,
});

export type AuthMode = 'passwordless' | 'password' | 'phone';

export default class AuthApi {
  private email: string | null = null;

  getDefaultAuthMode() {
    return getManifestExtra().flavor === 'courier' ? 'phone' : 'passwordless';
  }

  observeAuthState(handler: (a: FirebaseAuthTypes.User | null) => unknown) {
    return auth().onAuthStateChanged(handler);
  }

  // login with deeplink
  async sendSignInLinkToEmail(email: string): Promise<void> {
    this.email = email;
    const { flavor, environment, bundleIdentifier, androidPackage } = getManifestExtra();
    try {
      await addDoc(getLoginsCollection(), {
        email,
        flavor,
        signInAt: serverTimestamp(),
      });
    } catch (error) {
      console.warn(error);
      // Sentry.Native.captureException(error);
    }
    const url = `https://${getFallbackDomain(environment)}/${flavor}/join`;
    return auth().sendSignInLinkToEmail(email, {
      url,
      handleCodeInApp: true,
      iOS: {
        bundleId: bundleIdentifier,
      },
      android: {
        packageName: androidPackage,
        installApp: false,
      },
      dynamicLinkDomain: getDeeplinkDomain(environment),
    });
  }

  async signInWithEmailLink(link: string) {
    if (!this.email) throw new Error('E-mail inválido');
    const userCredential = await auth().signInWithEmailLink(this.email, link);
    return userCredential.user;
  }

  isSignInWithEmailLink(link: string | null): boolean {
    if (!link) return false;
    return auth().isSignInWithEmailLink(link);
  }

  async signInWithGoogle() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);
    return auth().signInWithCredential(googleCredential);
  }

  // login with email / password
  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await addDoc(getLoginsCollection(), {
        email,
        flavor: getFlavor(),
        signInAt: serverTimestamp(),
      });
    } catch (error) {
      // Sentry.Native.captureException(error);
    }
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  // login with phone
  async signInWithPhoneNumber(number: string, countryCode = '55') {
    const phone = `+${countryCode}${number}`;
    try {
      await addDoc(getLoginsCollection(), {
        phone,
        flavor: getFlavor(),
        signInAt: serverTimestamp(),
      });
    } catch (error) {
      // Sentry.Native.captureException(error);
    }
    return auth().signInWithPhoneNumber(phone);
  }

  async verifyPhoneNumber(phone: string, countryCode = '55') {
    return auth().verifyPhoneNumber(`+${countryCode}${phone}`);
  }

  async confirmPhoneSignIn(verificationId: string, verificationCode: string) {
    const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    const currentUser = auth().currentUser;
    if (currentUser) {
      if (this.getPhoneNumber()) await currentUser.unlink('phone');
      await currentUser.linkWithCredential(credential);
    }
  }

  getCurrentUser() {
    return auth().currentUser;
  }

  getUserId() {
    return this.getCurrentUser()?.uid;
  }

  getEmail() {
    return this.getCurrentUser()?.email;
  }

  getPhoneNumber(stripCountryCode = false) {
    const phone = this.getCurrentUser()?.phoneNumber;
    if (!phone || !stripCountryCode || phone.indexOf('+') !== 0) return phone;
    return phone.slice(3);
  }

  signOut() {
    return auth().signOut();
  }

  // firebase functions
  deleteAccount(payload: Partial<DeleteAccountPayload>) {
    return getDeleteAccountCallable()({
      ...payload,
      meta: { version: getAppVersion() },
    });
  }
}
