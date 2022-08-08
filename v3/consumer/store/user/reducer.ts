import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { ConsumerRootState, ThunkExtra } from '..';
import { AuthMode } from '../../../api/auth/AuthApi';
import { getFlavor } from '../../../config';
import { UserState } from './types';

const getDefaultAuthMode = (): AuthMode => {
  if (getFlavor() === 'consumer') return 'passwordless';
  if (getFlavor() === 'courier') return 'phone';
  if (getFlavor() === 'business') return 'password';
  throw new Error('Flavor inválido');
};

const initialState: UserState = {
  user: null,
  email: null,
  authMode: getDefaultAuthMode(),
};

export const loginWithEmail = (
  email: string
): ThunkAction<void, ConsumerRootState, ThunkExtra, AnyAction> =>
  async function (dispatch, getState, extra) {
    try {
      dispatch(updateEmail(email));
      console.log('Enviando', new Date().toISOString());
      await extra.api.getAuth().sendSignInLinkToEmail(email);
      console.log('Enviado', new Date().toISOString());
    } catch (error) {
      console.warn(error);
    }
  };

export const loginWithDeeplink = (
  link: string
): ThunkAction<void, ConsumerRootState, ThunkExtra, AnyAction> =>
  async function (dispatch, getState, extra) {
    try {
      const email = getState().user.email;
      if (!email) throw new Error('Email inválido.');
      await extra.api.getAuth().signInWithEmailLink(email, link);
    } catch (error) {
      console.warn(error);
    }
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
      console.log('updateEmail', action.payload);
    },
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { updateEmail, updateUser } = userSlice.actions;
