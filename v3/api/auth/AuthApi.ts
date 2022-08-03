import { DeleteAccountPayload } from '@appjusto/types';
import {
  ApplicationVerifier,
  Auth,
  getAuth,
  isSignInWithEmailLink,
  linkWithCredential,
  onAuthStateChanged,
  PhoneAuthProvider,
  sendSignInLinkToEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  unlink,
  Unsubscribe,
  User,
} from 'firebase/auth';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getFlavor, getManifestExtra } from '../../config';
import { getDeeplinkDomain, getFallbackDomain } from '../../config/domains';
import { getAppVersion } from '../../config/version';
import { getLoginsCollection } from '../../core/refs/firestore';
import { getDeleteAccountCallable } from '../../core/refs/functions';

export type AuthMode = 'passwordless' | 'password' | 'phone';

export default class AuthApi {
  private auth: Auth;
  constructor() {
    this.auth = getAuth();
  }
  observeAuthState(handler: (a: User | null) => unknown): Unsubscribe {
    return onAuthStateChanged(this.auth, handler);
  }

  // login with deeplink
  async sendSignInLinkToEmail(email: string): Promise<void> {
    const { flavor, environment, bundleIdentifier, androidPackage } = getManifestExtra();
    try {
      await addDoc(getLoginsCollection(), {
        email,
        flavor,
        signInAt: serverTimestamp(),
      });
    } catch (error) {
      // Sentry.Native.captureException(error);
    }
    const url = `https://${getFallbackDomain(environment)}/${flavor}/join`;
    return sendSignInLinkToEmail(this.auth, email, {
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

  async signInWithEmailLink(email: string, link: string) {
    const userCredential = await signInWithEmailLink(this.auth, email, link);
    return userCredential.user;
  }

  isSignInWithEmailLink(link: string | null): boolean {
    if (!link) return false;
    return isSignInWithEmailLink(this.auth, link);
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
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // login with phone
  async signInWithPhoneNumber(verifier: ApplicationVerifier, number: string, countryCode = '55') {
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
    return signInWithPhoneNumber(this.auth, phone, verifier);
  }

  async verifyPhoneNumber(
    applicationVerifier: ApplicationVerifier,
    phone: string,
    countryCode = '55'
  ) {
    const phoneProvider = new PhoneAuthProvider(this.auth);
    return phoneProvider.verifyPhoneNumber(`+${countryCode}${phone}`, applicationVerifier);
  }

  async confirmPhoneSignIn(verificationId: string, verificationCode: string) {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      if (this.getPhoneNumber()) await unlink(currentUser, 'phone');
      await linkWithCredential(currentUser, credential);
    } else {
      await signInWithCredential(this.auth, credential);
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
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
    return this.auth.signOut();
  }

  // firebase functions
  deleteAccount(payload: Partial<DeleteAccountPayload>) {
    return getDeleteAccountCallable()({
      ...payload,
      meta: { version: getAppVersion() },
    });
  }
}
