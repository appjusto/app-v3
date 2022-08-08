import { ConsumerRootState } from '..';

export const getEmail = (state: ConsumerRootState) => state.user.email;
export const getUser = (state: ConsumerRootState) => state.user.user;
