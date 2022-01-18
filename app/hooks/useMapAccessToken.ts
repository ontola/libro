import React from 'react';

import { handle } from '../helpers/logging';

import useStoredState from './useStoredState';

export interface LoadingMapAccessToken {
  error: undefined;
  expiresAt: undefined;
  loading: true;
  token: undefined;
}

const LOADING_TOKEN: LoadingMapAccessToken = {
  error: undefined,
  expiresAt: undefined,
  loading: true,
  token: undefined,
};

export interface ErrorMapAccessToken {
  error: Error;
  expiresAt: undefined;
  loading: false;
  token: undefined;
}

export interface ActiveMapAccessToken {
  error: undefined;
  expiresAt: string;
  loading: false;
  token: string;
}

export type MapAccessToken = LoadingMapAccessToken | ErrorMapAccessToken | ActiveMapAccessToken;
export type RequestMapAccessToken = () => Promise<void>;

export const MAP_STORE_KEY = 'map-access-token';
const TEN_MINUTES = 600000;

const requireNewToken = (token: MapAccessToken | undefined) => {
  if (!token?.expiresAt) {
    return true;
  }

  if (token.loading || token.error) {
    return false;
  }

  const parsedDate = Date.parse(token.expiresAt);

  return parsedDate <= Date.now() + TEN_MINUTES;
};

const requestToken = (): Promise<ActiveMapAccessToken> =>
  fetch('/api/maps/accessToken')
    .then((res) => res.json());

const serializeJSON = (val: string | undefined): MapAccessToken => val ? JSON.parse(val) : undefined;
const parseJSON = (val: MapAccessToken | undefined) => JSON.stringify(val);

const useMapAccessToken = (): [MapAccessToken, RequestMapAccessToken] => {
  const [token, setToken] = useStoredState<MapAccessToken>(
    MAP_STORE_KEY,
    undefined,
    sessionStorage,
    serializeJSON,
    parseJSON,
  );
  const shouldRequestNew = React.useMemo(() =>
    requireNewToken(token),
  [token],
  );
  const requestNewToken = React.useCallback(() => (
    requestToken().then(setToken).catch((e: Error) => {
      handle(e);
      const errorToken: ErrorMapAccessToken = {
        error: e,
        expiresAt: undefined,
        loading: false,
        token: undefined,
      };

      setToken(errorToken);
    })
  ), [setToken]);

  React.useEffect(() => {
    if (shouldRequestNew) {
      setToken(LOADING_TOKEN);
      requestNewToken();
    }
  }, [shouldRequestNew, requestNewToken]);

  if (shouldRequestNew || !token) {
    return [LOADING_TOKEN, requestNewToken];
  }

  return [token, requestNewToken];
};

export default useMapAccessToken;
