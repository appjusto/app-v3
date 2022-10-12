import { User } from 'firebase/auth';
import React from 'react';
import { useAuthDeeplink } from './useAuthDeeplink';
import { useUser } from './useUser';

const UserContext = React.createContext<User | null | undefined>(undefined);

interface Props {
  user: User;
  children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
  // state
  const user = useUser();
  // side effects
  useAuthDeeplink();
  // result
  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};

export const useContextUser = () => {
  return React.useContext(UserContext);
};
