import { Bank } from '@appjusto/types';
import React from 'react';
import { usePlatformApi } from '../ApiContext';

export const usePlatformParams = () => {
  // context
  const api = usePlatformApi();
  // state
  const [banks, setBanks] = React.useState<Bank[]>();
  // effects
  React.useEffect(() => {
    void (async () => {
      try {
        setBanks(await api.fetchBanks());
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [api]);
  // result
  return banks;
};
