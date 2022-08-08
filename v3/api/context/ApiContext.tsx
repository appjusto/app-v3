import React from 'react';
import { api } from '../../consumer/store';
import Api from '../Api';

const ApiContext = React.createContext<Api | undefined>(undefined);

interface Props {
  api: Api;
  children: React.ReactNode;
}

export const ApiContextProvider = (props: Props) => {
  return <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) throw new Error('Api fora de contexto.');
  return context;
};
