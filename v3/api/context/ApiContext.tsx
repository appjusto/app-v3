import React from 'react';
import { getManifestExtra } from '../../config';
import Api from '../Api';
import AuthApi from '../auth/AuthApi';
import PlatformApi from '../platform/PlatformApi';

interface Value {
  api: Api;
  auth: AuthApi;
  platform: PlatformApi;
}

const value: Value = {
  api: new Api(getManifestExtra()),
  auth: new AuthApi(),
  platform: new PlatformApi(),
};

const ApiContext = React.createContext<Value>(value);

interface Props {
  children: React.ReactNode;
}

export const ApiContextProvider = (props: Props) => {
  return <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) throw new Error('Api fora de contexto.');
  return context.api;
};

export const usePlatformApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) throw new Error('Api fora de contexto.');
  return context.platform;
};

export const useAuthApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) throw new Error('Api fora de contexto.');
  return context.auth;
};
