import { useURL } from 'expo-linking';
import { User } from 'firebase/auth';
import React from 'react';
import { useApi } from '../../common/context/ApiContext';
import { useUser } from '../../common/context/UserContext';
import { api } from '../Api';

export enum AuthState {
  CheckingPreviousSession = 'checking-previous-sesssion',
  CheckingDeeplink = 'checking-deeplink',
  Unsigned = 'unsigned',
  SigningIn = 'signing-in',
  SignedIn = 'signed-in',
  InvalidCredentials = 'invalid-credentials',
}

const extractAuthLink = (link: string) => {
  if (!link) return null;
  const authLink = link.split('link=').find((_, i, a) => i === a.length - 1);
  if (authLink) return decodeURIComponent(authLink);
  return null;
};

export const useAuthDeeplink = (): [AuthState, User | undefined | null] => {
  // context
  const auth = useApi().getAuth();
  const user = useUser();
  // state
  const deeplink = useURL();
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.CheckingPreviousSession);
  // side effects
  // subscribe once to be notified whenever the user changes (capture by the next effect)

  // whenever auth changes
  React.useEffect(() => {
    // undefined means we're still checking; nothing to be done in this case
    if (user === undefined) return;
    // null means that we've already checked and no user was previously stored
    if (user === null) {
      setAuthState(AuthState.CheckingDeeplink);
    } else {
      setAuthState(AuthState.SignedIn);
    }
  }, [user]);

  // check deeplink again
  React.useEffect(() => {
    console.log('Deeplink changed', deeplink);
    setAuthState((state) => {
      if (state === AuthState.InvalidCredentials || state === AuthState.Unsigned) {
        return AuthState.CheckingDeeplink;
      }
      return state;
    });
  }, [deeplink]);

  React.useEffect(() => {
    console.log(authState);
    if (authState !== AuthState.CheckingDeeplink) return;
    // undefined means useDeeplink hasnt finished yet
    if (deeplink === undefined) return;
    // null means there's no deeplink
    if (deeplink === null) {
      setAuthState(AuthState.Unsigned);
      return;
    }
    const link = extractAuthLink(deeplink);

    if (link === null || !auth.isSignInWithEmailLink(link)) {
      setAuthState(AuthState.Unsigned);
      return;
    }
    setAuthState(AuthState.SigningIn);
    api
      .getAuth()
      .signInWithEmailLink(link)
      .then(() => null)
      .catch(() => null);
  }, [auth, authState, deeplink]);

  return [authState, user];
};
