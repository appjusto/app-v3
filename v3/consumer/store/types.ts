import { LatLng } from '@appjusto/types';

export interface ConsumerLocation {
  title: string;
  coordinates: LatLng;
}

export interface ConsumerState {
  location: ConsumerLocation | undefined;
}
