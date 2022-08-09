import { NavigationContainer } from '@react-navigation/native';
import { ApiContextProvider } from '../common/context/ApiContext';
import { UserContextProvider } from '../common/context/UserContext';
import { ConsumerMainNavigator } from './ConsumerMainNavigator';
import { ConsumerContextProvider } from './context/ConsumerContext';

export const ConsumerApp = () => {
  return (
    <ApiContextProvider>
      <UserContextProvider>
        <ConsumerContextProvider>
          <NavigationContainer>
            <ConsumerMainNavigator />
          </NavigationContainer>
        </ConsumerContextProvider>
      </UserContextProvider>
    </ApiContextProvider>
  );
};
