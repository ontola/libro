import { CALL_API } from 'redux-api-middleware';

const API_ROOT = 'http://localhost:3000/api';

export const apiGetMotions = (id) => ({
  [CALL_API]: {
    endpoint: API_ROOT + (id ? `/motions?identifier=${id}` : '/motions'),
    method: 'GET',
    types: [
      'FETCH_MOTIONS_REQUEST',
      'FETCH_MOTIONS_SUCCESS',
      'FETCH_MOTIONS_FAILURE',
    ]
  }
});
