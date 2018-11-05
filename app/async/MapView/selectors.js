import { MapReducerKey } from './reducer';

export const getAccessToken = state => state.getIn([MapReducerKey, 'accessToken']);
export const getAccessTokenExpiry = state => state.getIn([MapReducerKey, 'expiresAt']);
