import { Environment, Flavor } from '@appjusto/types';

export interface Extra {
  flavor: Flavor;
  environment: Environment;
  bundleIdentifier: string;
  androidPackage: string;
  firebase: FirebaseConfig;
  eas: {
    projectId: string;
  };
  analytics: AnalyticsConfig;
  iugu: {
    accountId: string;
  };
  algolia: AlgoliaConfig;
}

export interface AnalyticsConfig {
  sentryDNS: string;
}

export interface AlgoliaConfig {
  appId: string;
  apiKey: string;
}

export interface FirebaseConfig {
  apiKeyAndroid: string;
  apiKeyiOS: string;
  authDomain: string;
  region: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  emulator: {
    enabled: boolean;
    host?: string;
  };
  measurementId?: string;
}
