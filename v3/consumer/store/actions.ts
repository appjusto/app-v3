import { createAsyncThunk } from '@reduxjs/toolkit';
import { consumerSlice } from './reducer';

export const { updateLocation } = consumerSlice.actions;

export const incrementAsync = createAsyncThunk('consumer/fetchCount', async () => {
  const response = await Promise.resolve('dummy');
  return response;
});
