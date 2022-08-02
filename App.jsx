import { LogBox } from 'react-native';
import { App } from './v3/common/App';

// eslint-disable-next-line no-undef
if (__DEV__) {
  LogBox.ignoreLogs([
    'Setting a timer',
    'Sentry Logger',
    'AsyncStorage has been extracted',
    'You need to add `ACCESS_BACKGROUND_LOCATION`',
    'ViewPropTypes will be removed',
  ]);
}

// eslint-disable-next-line react/display-name
export default () => <App />;
