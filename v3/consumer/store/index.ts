import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Api from '../../api/Api';
import { getManifestExtra } from '../../config';
import profileReducer from './profile/reducer';
import userReducer from './user/reducer';

export const api = new Api(getManifestExtra());
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
      serializableCheck: {
        ignoredActions: ['user/updateUser'],
        ignoredPaths: ['user.user'],
      },
    }),
});

export type ConsumerAppDispatch = typeof store.dispatch;
export type ConsumerRootState = ReturnType<typeof store.getState>;
export type ThunkExtra = {
  api: Api;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ConsumerRootState,
  ThunkExtra,
  Action<string>
>;

export const useConsumerAppDispatch = () => {
  return useDispatch<ConsumerAppDispatch>();
};
