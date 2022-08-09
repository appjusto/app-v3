import { User } from 'firebase/auth';
import React from 'react';
import { useAuthDeeplink } from '../../api/auth/useAuthDeeplink';
import { useApi } from './ApiContext';

const UserContext = React.createContext<User | null | undefined>(undefined);

interface Props {
  user: User;
  children: React.ReactNode;
}

export const UserContextProvider = (props: Props) => {
  // context
  const api = useApi();
  // state
  const [user, setUser] = React.useState<User | null>();
  // side effects
  useAuthDeeplink();
  React.useEffect(() => {
    api.getAuth().observeAuthState(setUser);
  }, [api]);
  // result
  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};

export const useUser = () => {
  return React.useContext(UserContext);
};
