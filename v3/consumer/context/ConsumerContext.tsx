import { ConsumerProfile, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../../api/ApiContext';
import { useContextUser } from '../../api/auth/AuthContext';
import { useAuthDeeplink } from '../../api/auth/useAuthDeeplink';
import { ConsumerContextState, ConsumerLocation } from './types';

const ConsumerContext = React.createContext<ConsumerContextState | undefined>(undefined);

interface Props extends ConsumerContextState {
  children: React.ReactNode;
}

export const ConsumerContextProvider = (props: Props) => {
  // context
  const api = useContextApi();
  const user = useContextUser();
  // state
  const [consumer, setConsumer] = React.useState<WithId<ConsumerProfile>>();
  const [location, updateLocation] = React.useState<ConsumerLocation>();
  // side effects
  useAuthDeeplink();
  React.useEffect(() => {
    if (!user?.uid) return;
    return api.getProfile().observeProfile<ConsumerProfile>(user.uid, setConsumer);
  }, [api, user?.uid]);
  // result
  return (
    <ConsumerContext.Provider value={{ consumer, location, updateLocation }}>
      {props.children}
    </ConsumerContext.Provider>
  );
};

export const useContextConsumer = () => {
  const context = React.useContext(ConsumerContext);
  if (!context) throw new Error('Fora de contexto.');
  return context.consumer;
};

export const useLocation = () => {
  const context = React.useContext(ConsumerContext);
  if (!context) throw new Error('Fora de contexto.');
  return context.location;
};

export const useUpdateLocation = () => {
  const context = React.useContext(ConsumerContext);
  if (!context) throw new Error('Fora de contexto.');
  return context.updateLocation;
};
