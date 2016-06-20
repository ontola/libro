import { CALL_API } from 'redux-api-middleware';
import { API_ROOT } from '../constants/config';
import * as action from '../constants/actionTypes';

const apiGetMotions = (id) => ({
  [CALL_API]: {
    endpoint: API_ROOT + (id ? `/motions?identifier=${id}` : '/motions'),
    method: 'GET',
    types: [
      action.FETCH_MOTIONS_REQUEST,
      action.FETCH_MOTIONS_SUCCESS,
      action.FETCH_MOTIONS_FAILURE,
    ],
  },
});

export {
  apiGetMotions,
};
