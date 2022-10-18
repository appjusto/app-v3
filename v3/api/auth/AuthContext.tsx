import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { useAuthDeeplink } from './useAuthDeeplink';
import { useUser } from './useUser';

const UserContext = React.createContext<FirebaseAuthTypes.User | null | undefined>(undefined);

interface Props {
  user: FirebaseAuthTypes.User;
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
