import { ConfigContext, ExpoConfig } from '@expo/config';
import { Splash } from '@expo/config-types';
import * as dotenv from 'dotenv';
import { Env } from './env';
import { Extra } from './v3/common/config/types';
import { version, versionCode } from './version.json';

dotenv.config();
const {
  FLAVOR,
  ENV,
  EXPO_CONSUMER_ID,
  EXPO_COURIER_ID,
  EXPO_BUSINESS_ID,
  MAPS_API_KEY,
  FIREBASE_REGION,
  GOOGLE_SERVICES_JSON,
  GOOGLE_SERVICES_PLIST,
  FIREBASE_EMULATOR,
  FIREBASE_EMULATOR_HOST,
  SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  IUGU_ACCOUNT_ID,
  ALGOLIA_APPID,
  ALGOLIA_APIKEY,
} = process.env as unknown as Env;
const E = ENV.charAt(0);

const expoId = () => {
  if (FLAVOR === 'consumer') return EXPO_CONSUMER_ID;
  if (FLAVOR === 'courier') return EXPO_COURIER_ID;
  if (FLAVOR === 'business') return EXPO_BUSINESS_ID;
  throw new Error('FLAVOR inválido');
};

const name = () => {
  let name = 'AppJusto';
  if (ENV === 'live') {
    if (FLAVOR === 'consumer') return name;
    if (FLAVOR === 'courier') return `${name} Entregador`;
    if (FLAVOR === 'business') return `${name} Restaurante`;
  }
  if (FLAVOR === 'courier') name = 'Entregador';
  if (FLAVOR === 'business') name = 'Restaurante';
  return `(${E.toUpperCase()}) ${name}`;
};

const slug = () => {
  const slug = `app-justo-${FLAVOR}`;
  if (ENV !== 'live') return `${slug}-${ENV}`;
  return slug;
};

const splash = (): Splash => {
  if (FLAVOR === 'business') {
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
  return `br.com.appjusto.${FLAVOR}.${ENV}`;
};

const icon = (platform: 'ios' | 'android') => {
  return `./assets/${FLAVOR}/icon-${platform}.png`;
};

const getBaseDomain = () => `${ENV === 'live' ? '' : `${ENV}.`}appjusto.com.br`;
const getDeeplinkDomain = () => `${E}.deeplink.appjusto.com.br`;
const getFallbackDomain = () => `${ENV === 'live' ? '' : `${ENV}.`}login.appjusto.com.br`;

type Plugins = (string | [] | [string] | [string, unknown])[];
const plugins = (): Plugins => {
  const common: Plugins = [
    'expo-splash-screen',
    'sentry-expo',
    '@react-native-firebase/app',
    ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
  ];
  if (FLAVOR === 'courier')
    return [
      ...common,
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          sounds: ['./assets/courier/order_request.wav'],
        },
      ],
    ];
  return common;
};
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
// android
const androidBackgroundColor = () => {
  if (FLAVOR === 'consumer') return '#78E08F';
  if (FLAVOR === 'courier') return '#FFE493';
  if (FLAVOR === 'business') return '#2F422C';
  throw new Error('FLAVOR inválido');
};
const androidPermissions = () => {
  if (FLAVOR === 'consumer') {
    return ['RECEIVE_BOOT_COMPLETED', 'ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'];
  } else if (FLAVOR === 'courier') {
    return [
      'RECEIVE_BOOT_COMPLETED',
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'VIBRATE',
    ];
  } else if (FLAVOR === 'business') return ['RECEIVE_BOOT_COMPLETED', 'WAKE_LOCK'];
  throw new Error('FLAVOR inválido');
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
    intentFilter(getBaseDomain(), `/${FLAVOR}`),
    intentFilter(getDeeplinkDomain(), `/${FLAVOR}`),
    intentFilter(getFallbackDomain(), `/${FLAVOR}`),
  ];
  if (FLAVOR === 'consumer') {
    filters.push(intentFilter(getBaseDomain(), '/r'));
  } else if (FLAVOR === 'courier') {
    filters.push(intentFilter(getBaseDomain(), '/f'));
  }
  return filters;
};
// result
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: name(),
    slug: slug(),
    version,
    platforms: ['ios', 'android'],
    splash: splash(),
    ios: {
      bundleIdentifier: appBundlePackage(),
      buildNumber: `${versionCode}`,
      icon: icon('ios'),
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'Precisamos da sua localização para exibir os restaurantes próximos a você',
      },
      associatedDomains: [
        `applinks:${getBaseDomain()}`,
        `applinks:${getDeeplinkDomain()}`,
        `applinks:${getFallbackDomain()}`,
      ],
      googleServicesFile: GOOGLE_SERVICES_PLIST,
      config: {
        googleMapsApiKey: MAPS_API_KEY,
      },
    },
    android: {
      package: appBundlePackage(),
      versionCode,
      adaptiveIcon: {
        foregroundImage: icon('android'),
        backgroundColor: androidBackgroundColor(),
      },
      permissions: androidPermissions(),
      intentFilters: intentFilters(),
      googleServicesFile: GOOGLE_SERVICES_JSON,
      config: {
        googleMaps: {
          apiKey: MAPS_API_KEY,
        },
      },
    },
    plugins: plugins(),
    extra: {
      flavor: FLAVOR,
      environment: ENV,
      bundleIdentifier: appBundlePackage(),
      androidPackage: appBundlePackage(),
      eas: {
        projectId: expoId(),
      },
      firebase: {
        region: FIREBASE_REGION,
        emulator: {
          enabled: FIREBASE_EMULATOR === 'true',
          host: FIREBASE_EMULATOR_HOST,
        },
      },
      analytics: {
        sentryDNS: SENTRY_DSN,
      },
      iugu: {
        accountId: IUGU_ACCOUNT_ID,
      },
      algolia: {
        appId: ALGOLIA_APPID,
        apiKey: ALGOLIA_APIKEY,
      },
    } as Extra,
    hooks: hooks(),
    updates: {
      url: `https://u.expo.dev/${expoId()}`,
      fallbackToCacheTimeout: 1000 * (FLAVOR === 'courier' ? 30 : 0),
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  };
};
