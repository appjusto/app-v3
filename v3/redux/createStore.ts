import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './business/reducer';

export const store = configureStore({
  reducer: {
    business: businessReducer,
  },
});
