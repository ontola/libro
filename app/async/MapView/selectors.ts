import { MapReducerKey } from './reducer';

export const getAccessToken = (state: any) => state.getIn([MapReducerKey, 'accessToken']);
export const getAccessTokenError = (state: any) => state.getIn([MapReducerKey, 'error']);
export const getAccessTokenExpiry = (state: any) => state.getIn([MapReducerKey, 'expiresAt']);
