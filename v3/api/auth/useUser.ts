import { User } from 'firebase/auth';
import React from 'react';
import { useContextApi } from '../ApiContext';

export const useUser = () => {
  // context
  const api = useContextApi();
  // state
  const [user, setUser] = React.useState<User | null>();
  React.useEffect(() => {
    return api.getAuth().observeAuthState(setUser);
  }, [api]);
  // result
  return user;
};
