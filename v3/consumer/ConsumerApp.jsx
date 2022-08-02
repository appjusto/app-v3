import { Provider } from 'react-redux';
import { ConsumerHome } from './home/ConsumerHome';
import { store } from './store';

export const ConsumerApp = () => {
  return (
    <Provider store={store}>
      <ConsumerHome />
    </Provider>
  );
};
