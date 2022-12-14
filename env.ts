import { Environment, Flavor } from '@appjusto/types';

export interface Env {
  FLAVOR: Flavor;
  ENV: Environment;
  EXPO_CONSUMER_ID: string;
  EXPO_COURIER_ID: string;
  EXPO_BUSINESS_ID: string;
  GOOGLE_SERVICES_FILE: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_REGION: string;
  FIREBASE_CONSUMER_APP_ID: string;
  FIREBASE_COURIER_APP_ID: string;
  FIREBASE_BUSINESS_APP_ID: string;
  FIREBASE_API_KEY_IOS: string;
  FIREBASE_API_KEY_ANDROID: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_EMULATOR: string;
  FIREBASE_EMULATOR_HOST: string;
  SENTRY_DSN: string;
  SENTRY_AUTH_TOKEN: string;
  IUGU_ACCOUNT_ID: string;
  ALGOLIA_APPID: string;
  ALGOLIA_APIKEY: string;
}
