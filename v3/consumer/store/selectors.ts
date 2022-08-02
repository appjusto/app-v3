import { ConsumerRootState } from '.';

export const getConsumerLocation = (state: ConsumerRootState) => state.consumer.location;
