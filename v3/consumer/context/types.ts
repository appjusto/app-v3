import { ConsumerProfile, LatLng } from '@appjusto/types';

export interface ConsumerLocation {
  title: string;
  coordinates: LatLng;
}

export interface ConsumerContextState {
  consumer: ConsumerProfile | undefined;
  location: ConsumerLocation | undefined;
  updateLocation: (value: ConsumerLocation) => void;
}
