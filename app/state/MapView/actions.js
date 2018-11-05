import { createAction } from 'redux-actions';

import {
  AFE_API_GET_MAP_ACCESS_TOKEN,
  MAP_SET_ACCESS_TOKEN,
} from '../action-types';


export const getMapAccessToken = createAction(AFE_API_GET_MAP_ACCESS_TOKEN);
export const setMapAccessToken = createAction(MAP_SET_ACCESS_TOKEN);
