import { isEmpty } from 'lodash';
import React from 'react';
import { AuthMode } from '../../api/auth/AuthApi';
import { useApi } from '../../api/context/ApiContext';
import { useConsumerAppDispatch } from '../../consumer/store';
import { loginWithEmail } from '../../consumer/store/user/reducer';
import { validateEmail } from '../../core/validators';

export const useLogin = (
  authMode: AuthMode,
  email: string,
  password: string,
  phone: string,
  acceptedTerms: boolean
) => {
  // context
  const auth = useApi().getAuth();
  // redux
  const dispatch = useConsumerAppDispatch();
  // state
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>();
  const disabled = (() => {
    if (!acceptedTerms) return true;
    if (loading) return true;
    if (authMode === 'phone') {
      if (isEmpty(phone)) return true;
    } else {
      if (isEmpty(email)) return true;
      if (validateEmail(email).status === 'error') return true;
    }
    return false;
  })();
  // handlers
  const login = React.useCallback(() => {
    try {
      if (disabled) return;
      setLoading(true);
      setError(undefined);
      if (authMode === 'passwordless') {
        dispatch(loginWithEmail(email.trim().toLowerCase()));
      } else if (authMode === 'password') {
        // await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
      } else if (authMode === 'phone') {
        // await auth.phone(email, password);
      }
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      setError(error);
    }
  }, [authMode, disabled, dispatch, email]);
  // result
  return { disabled, loading, error, login };
};
