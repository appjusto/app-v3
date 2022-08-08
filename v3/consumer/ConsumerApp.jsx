import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { AuthContainer } from '../api/auth/context/AuthContainer';
import { ApiContextProvider } from '../api/context/ApiContext';
import { ConsumerMainNavigator } from './ConsumerMainNavigator';
import { store } from './store';

export const ConsumerApp = () => {
  return (
    <Provider store={store}>
      <ApiContextProvider>
        <AuthContainer>
          <NavigationContainer>
            <ConsumerMainNavigator />
          </NavigationContainer>
        </AuthContainer>
      </ApiContextProvider>
    </Provider>
  );
};
