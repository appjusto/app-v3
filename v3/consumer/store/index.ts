import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import consumerReducer from './reducer';

export const store = configureStore({
  reducer: {
    consumer: consumerReducer,
  },
});

export type ConsumerAppDispatch = typeof store.dispatch;
export type ConsumerRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ConsumerRootState,
  unknown,
  Action<string>
>;

export const useConsumerAppDispatch = () => {
  return useDispatch<ConsumerAppDispatch>();
};
