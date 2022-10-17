import { Environment, Flavor } from '@appjusto/types';

export interface Env {
  FLAVOR: Flavor;
  ENV: Environment;
  EXPO_CONSUMER_ID: string;
  EXPO_COURIER_ID: string;
  EXPO_BUSINESS_ID: string;
  FIREBASE_REGION: string;
  GOOGLE_SERVICES_JSON: string;
  GOOGLE_SERVICES_PLIST: string;
  MAPS_API_KEY: string;
  FIREBASE_EMULATOR: string;
  FIREBASE_EMULATOR_HOST: string;
  SENTRY_DSN: string;
  SENTRY_AUTH_TOKEN: string;
  IUGU_ACCOUNT_ID: string;
  ALGOLIA_APPID: string;
  ALGOLIA_APIKEY: string;
}
