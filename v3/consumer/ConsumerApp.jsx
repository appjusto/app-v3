import { Provider } from 'react-redux';
import { ApiContextProvider } from '../api/context/ApiContext';
import { ConsumerHome } from './home/ConsumerHome';
import { store } from './store';

export const ConsumerApp = () => {
  return (
    <Provider store={store}>
      <ApiContextProvider>
        <ConsumerHome />
      </ApiContextProvider>
    </Provider>
  );
};
