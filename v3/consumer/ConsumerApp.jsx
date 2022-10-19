import { NavigationContainer } from '@react-navigation/native';
import { ApiContextProvider } from '../api/ApiContext';
import { AuthContextProvider } from '../api/auth/AuthContext';
import { ProfileContextProvider } from '../api/profile/ProfileContext';
import { ConsumerMainNavigator } from './ConsumerMainNavigator';
import { ConsumerContextProvider } from './context/ConsumerContext';

export const ConsumerApp = () => {
  return (
    <ApiContextProvider>
      <AuthContextProvider>
        <ProfileContextProvider>
          <ConsumerContextProvider>
            <NavigationContainer>
              <ConsumerMainNavigator />
            </NavigationContainer>
          </ConsumerContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </ApiContextProvider>
  );
};
