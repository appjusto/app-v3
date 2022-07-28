import { Environment, Flavor } from '@appjusto/types';
import { ConfigContext, ExpoConfig } from '@expo/config';
import { Android, IOS, Splash } from '@expo/config-types';
import 'dotenv/config';
import { Extra } from './v3/config/types';
import { version, versionCode } from './version.json';

const {
  FLAVOR,
  ENVIRONMENT,
  FIREBASE_API_KEY_ANDROID,
  FIREBASE_API_KEY_IOS,
  FIREBASE_REGION,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_CONSUMER_APP_ID,
  FIREBASE_COURIER_APP_ID,
  FIREBASE_BUSINESS_APP_ID,
  FIREBASE_EMULATOR_HOST,
  SEGMENT_CONSUMER_IOS_KEY,
  SEGMENT_CONSUMER_ANDROID_KEY,
  SEGMENT_COURIER_IOS_KEY,
  SEGMENT_COURIER_ANDROID_KEY,
  SENTRY_DSN,
  IUGU_ACCOUNT_ID,
  ALGOLIA_APPID,
  ALGOLIA_APIKEY,
  SENTRY_AUTH_TOKEN,
} = process.env;

console.log({
  FLAVOR,
  ENVIRONMENT,
  FIREBASE_API_KEY_ANDROID,
  FIREBASE_API_KEY_IOS,
  FIREBASE_REGION,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_CONSUMER_APP_ID,
  FIREBASE_COURIER_APP_ID,
  FIREBASE_BUSINESS_APP_ID,
  FIREBASE_EMULATOR_HOST,
  SEGMENT_CONSUMER_IOS_KEY,
  SEGMENT_CONSUMER_ANDROID_KEY,
  SEGMENT_COURIER_IOS_KEY,
  SEGMENT_COURIER_ANDROID_KEY,
  SENTRY_DSN,
  IUGU_ACCOUNT_ID,
  ALGOLIA_APPID,
  ALGOLIA_APIKEY,
  SENTRY_AUTH_TOKEN,
});

const flavor: Flavor = FLAVOR as Flavor;
const environment: Environment = ENVIRONMENT as Environment;

const name = () => {
  let name = 'AppJusto';
  if (environment === 'live') {
    if (flavor === 'consumer') return name;
    if (flavor === 'courier') return `${name} Entregador`;
    if (flavor === 'business') return `${name} Restaurante`;
  }
  if (flavor === 'courier') name = 'Entregador';
  if (flavor === 'business') name = 'Restaurante';
  return `(${environment.charAt(0).toUpperCase()}) ${name}`;
};

const slug = () => {
  const slug = `app-justo-${flavor}`;
  if (environment !== 'live') return `${slug}-${environment}`;
  return slug;
};

const splash = (): Splash => {
  if (flavor === 'business') {
    return {
      image: './assets/business/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#9ce592',
    };
  }
  return {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#9ce592',
  };
};

const appBundlePackage = () => {
  return `br.com.appjusto.${flavor}.${environment}`;
};

const icon = (platform: 'ios' | 'android') => {
  return `./assets/${flavor}/icon-${platform}.png`;
};

const getBaseDomain = (environment: Environment) =>
  `${environment === 'live' ? '' : `${environment}.`}appjusto.com.br`;

const getDeeplinkDomain = (environment: Environment) =>
  `${environment.charAt(0)}.deeplink.appjusto.com.br`;

const getFallbackDomain = (environment: Environment) =>
  `${environment === 'live' ? '' : `${environment}.`}login.appjusto.com.br`;

// ios

export const infoPlist = (): { [k: string]: any } => {
  if (flavor === 'business') return { UIBackgroundModes: ['fetch'] };
  if (flavor === 'consumer')
    return {
      NSLocationWhenInUseUsageDescription:
        'Precisamos da sua localização para exibir os restaurantes próximos a você',
    };
  if (flavor === 'courier')
    return {
      UIBackgroundModes: ['location'],
      NSLocationWhenInUseUsageDescription:
        'Precisamos da sua localização para enviar corridas próximas e monitorar a entrega.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Precisamos da sua localização para enviar corridas próximas e monitorar a entrega.',
    };
  return {};
};

const ios = (): IOS => ({
  bundleIdentifier: appBundlePackage(),
  buildNumber: `${versionCode}`,
  icon: icon('ios'),
  supportsTablet: false,
  infoPlist: infoPlist(),
  associatedDomains: [
    `applinks:${getBaseDomain(environment)}`,
    `applinks:${getDeeplinkDomain(environment)}`,
    `applinks:${getFallbackDomain(environment)}`,
  ],
  config: {
    googleMapsApiKey: FIREBASE_API_KEY_IOS,
  },
});

// android

const androidBackgroundColor = () => {
  if (flavor === 'courier') return '#FFE493';
  if (flavor === 'business') return '#2F422C';
  return '#78E08F';
};

const androidPermissions = () => {
  if (flavor === 'courier')
    return [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'VIBRATE',
    ];
  if (flavor === 'business') return ['RECEIVE_BOOT_COMPLETED', 'WAKE_LOCK'];
  return ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'];
};

const intentFilter = (host: string, pathPrefix: string) => ({
  action: 'VIEW',
  autoVerify: false,
  data: [
    {
      scheme: 'https',
      host,
      pathPrefix,
    },
  ],
  category: ['BROWSABLE', 'DEFAULT'],
});

const intentFilters = () => {
  const filters = [
    intentFilter(getBaseDomain(environment), `/${flavor}`),
    intentFilter(getDeeplinkDomain(environment), `/${flavor}`),
    intentFilter(getFallbackDomain(environment), `/${flavor}`),
  ];
  if (flavor === 'consumer') {
    filters.push(intentFilter(getBaseDomain(environment), `/r`));
  } else if (flavor === 'courier') {
    filters.push(intentFilter(getBaseDomain(environment), `/f`));
  }
  return filters;
};

const android = (): Android => ({
  package: appBundlePackage(),
  versionCode,
  adaptiveIcon: {
    foregroundImage: icon('android'),
    backgroundColor: androidBackgroundColor(),
  },
  googleServicesFile: `./google-services-${environment}.json`,
  useNextNotificationsApi: true,
  softwareKeyboardLayoutMode: 'pan',
  permissions: androidPermissions(),
  intentFilters: intentFilters(),
  config: {
    googleMaps: {
      apiKey: FIREBASE_API_KEY_ANDROID,
    },
  },
});

const plugins = (): (string | [] | [string] | [string, any])[] => {
  if (flavor === 'courier')
    return [
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          sounds: ['./assets/courier/order_request.wav'],
        },
      ],
      'expo-splash-screen',
      'sentry-expo',
    ];
  return [];
};

const firebaseAppId = () => {
  if (flavor === 'courier') return FIREBASE_COURIER_APP_ID as string;
  if (flavor === 'business') return FIREBASE_BUSINESS_APP_ID as string;
  if (flavor === 'consumer') return FIREBASE_CONSUMER_APP_ID as string;
  return '';
};

const extra = (): Extra => ({
  flavor,
  environment,
  bundleIdentifier: appBundlePackage(),
  androidPackage: appBundlePackage(),
  firebase: {
    apiKeyAndroid: FIREBASE_API_KEY_ANDROID!,
    apiKeyiOS: FIREBASE_API_KEY_IOS!,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    region: FIREBASE_REGION!,
    projectId: FIREBASE_PROJECT_ID!,
    storageBucket:
      process.env.FIREBASE_EMULATOR === 'true'
        ? 'gs://default-bucket'
        : `${FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID!,
    appId: firebaseAppId(),
    emulator: {
      enabled: process.env.FIREBASE_EMULATOR === 'true',
      host: FIREBASE_EMULATOR_HOST,
    },
  },
  analytics: {
    segmentConsumerAndroidKey: SEGMENT_CONSUMER_ANDROID_KEY!,
    segmentConsumeriOSKey: SEGMENT_CONSUMER_IOS_KEY!,
    segmentCourierAndroidKey: SEGMENT_COURIER_ANDROID_KEY!,
    segmentCourieriOSKey: SEGMENT_COURIER_IOS_KEY!,
    sentryDNS: SENTRY_DSN!,
  },
  iugu: {
    accountId: IUGU_ACCOUNT_ID!,
  },
  algolia: {
    appId: ALGOLIA_APPID!,
    apiKey: ALGOLIA_APIKEY!,
  },
});

const hooks = () => ({
  postPublish: [
    {
      file: 'sentry-expo/upload-sourcemaps',
      config: {
        organization: 'app-justo',
        project: 'app',
        authToken: SENTRY_AUTH_TOKEN,
      },
    },
  ],
});

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log(config);
  return {
    ...config,
    privacy: 'hidden',
    platforms: ['ios', 'android'],
    orientation: 'portrait',
    version,
    name: name(),
    slug: slug(),
    splash: splash(),
    ios: ios(),
    android: android(),
    plugins: plugins(),
    androidStatusBar: {
      hidden: true,
    },
    extra: extra(),
    hooks: hooks(),
    notification: {
      icon: './assets/notification-icon.png',
    },
    updates: {
      fallbackToCacheTimeout: 1000 * (flavor === 'courier' ? 30 : 0),
    },
    assetBundlePatterns: ['**/*'],
  };
};
