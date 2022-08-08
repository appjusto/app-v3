import { useURL } from 'expo-linking';
import { User } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useConsumerAppDispatch } from '../../consumer/store';
import { loginWithDeeplink, updateUser } from '../../consumer/store/user/reducer';
import { getEmail, getUser } from '../../consumer/store/user/selectors';
import { useApi } from '../context/ApiContext';

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
  // redux
  const dispatch = useConsumerAppDispatch();
  const email = useSelector(getEmail);
  const user = useSelector(getUser);
  // state
  const deeplink = useURL();
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.CheckingPreviousSession);
  // side effects
  // subscribe once to be notified whenever the user changes (capture by the next effect)
  React.useEffect(() => {
    return auth.observeAuthState((user) => dispatch(updateUser(user)));
  }, [auth, dispatch]);

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
    if (!email) {
      setAuthState(AuthState.InvalidCredentials);
      return;
    }
    dispatch(loginWithDeeplink(link));
  }, [auth, authState, deeplink, dispatch, email]);

  return [authState, user];
};
