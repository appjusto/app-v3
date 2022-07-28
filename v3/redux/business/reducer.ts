import { createSlice } from '@reduxjs/toolkit';
import { BusinessState } from './types';

const { actions, reducer } = createSlice({
  name: 'business',
  initialState: {} as BusinessState,
  reducers: {
    updateManager(state, action) {
      state.manager = action.payload.profile;
    },
    updateBusiness(state, action) {
      state.business = action.payload.business;
    },
  },
});

export const { updateManager, updateBusiness } = actions;
export default reducer;
