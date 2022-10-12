import { NavigationContainer } from '@react-navigation/native';
import { ApiContextProvider } from '../api/ApiContext';
import { AuthContextProvider } from '../api/auth/AuthContext';
import { ConsumerMainNavigator } from './ConsumerMainNavigator';
import { ConsumerContextProvider } from './context/ConsumerContext';

export const ConsumerApp = () => {
  return (
    <ApiContextProvider>
      <AuthContextProvider>
        <ConsumerContextProvider>
          <NavigationContainer>
            <ConsumerMainNavigator />
          </NavigationContainer>
        </ConsumerContextProvider>
      </AuthContextProvider>
    </ApiContextProvider>
  );
};
