import { isEmpty } from 'lodash';
import React from 'react';
import { AuthMode } from '../../api/auth/AuthApi';
import { useAuthApi } from '../../api/context/ApiContext';
import { validateEmail } from '../../core/validators';

export const useLogin = (
  authMode: AuthMode,
  email: string,
  password: string,
  phone: string,
  acceptedTerms: boolean
) => {
  // context
  const auth = useAuthApi();
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
  const login = React.useCallback(async () => {
    try {
      if (disabled) return;
      setLoading(true);
      setError(undefined);
      if (authMode === 'passwordless') {
        await auth.sendSignInLinkToEmail(email.trim().toLowerCase());
      } else if (authMode === 'password') {
        await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
      } else if (authMode === 'phone') {
        // await auth.phone(email, password);
      }
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      setError(error);
    }
  }, [auth, authMode, disabled, email, password]);
  // result
  return { disabled, loading, error, login };
};
