import { MapReducerKey, MapViewStateTree } from './reducer';

export const getAccessToken = (state: MapViewStateTree): string => state[MapReducerKey]?.accessToken;
export const getAccessTokenError = (state: MapViewStateTree): Error | undefined => state[MapReducerKey]?.error;
