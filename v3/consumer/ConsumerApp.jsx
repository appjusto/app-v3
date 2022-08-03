import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ApiContextProvider } from '../api/context/ApiContext';
import { ConsumerMainNavigator } from './ConsumerMainNavigator';
import { store } from './store';

export const ConsumerApp = () => {
  return (
    <Provider store={store}>
      <ApiContextProvider>
        <NavigationContainer>
          <ConsumerMainNavigator />
        </NavigationContainer>
      </ApiContextProvider>
    </Provider>
  );
};
