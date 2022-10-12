import { isEmpty } from 'lodash';
import React from 'react';
import { useContextApi } from '../../api/ApiContext';
import { AuthMode } from '../../api/auth/AuthApi';
import { validateEmail } from '../core/validators';

export const useLogin = (
  authMode: AuthMode,
  email: string,
  password: string,
  phone: string,
  acceptedTerms: boolean
) => {
  // conext
  const api = useContextApi();
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
      void (async () => {
        if (disabled) return;
        setError(undefined);
        setLoading(true);
        if (authMode === 'passwordless') {
          await api.getAuth().sendSignInLinkToEmail(email.trim().toLowerCase());
        } else if (authMode === 'password') {
          await api.getAuth().signInWithEmailAndPassword(email.trim().toLowerCase(), password);
        } else if (authMode === 'phone') {
          // await auth.phone(email, password);
        }
        setLoading(false);
      })();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [api, authMode, disabled, email, password]);
  // result
  return { disabled, loading, error, login };
};
