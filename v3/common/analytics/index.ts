import * as Sentry from 'sentry-expo';
import { getEnv, getFlavor, getManifestExtra } from '../config';

export const init = () => {
  const { analytics } = getManifestExtra();
  Sentry.init({
    dsn: analytics.sentryDNS,
    enableInExpoDevelopment: true,
    environment: getEnv(),
    debug: getEnv() !== 'live',
  });
  Sentry.Native.setExtra('flavor', getFlavor());
};
