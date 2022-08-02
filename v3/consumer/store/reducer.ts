import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConsumerLocation, ConsumerState } from './types';

const initialState: ConsumerState = {
  location: undefined,
};

export const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateLocation: (state, action: PayloadAction<ConsumerLocation>) => {
      state.location = action.payload;
    },
  },
});

export default consumerSlice.reducer;
