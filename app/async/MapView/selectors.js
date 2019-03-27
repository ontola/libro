import { MapReducerKey } from './reducer';

export const getAccessToken = state => state.getIn([MapReducerKey, 'accessToken']);
export const getAccessTokenError = state => state.getIn([MapReducerKey, 'error']);
export const getAccessTokenExpiry = state => state.getIn([MapReducerKey, 'expiresAt']);
