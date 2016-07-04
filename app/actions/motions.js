import { CALL_API } from 'redux-api-middleware';
import { ARGU_API_URL } from '../constants/config';
import * as action from '../constants/actionTypes';

const apiGetMotions = (id) => {
  const route = (id ? `/motions?identifier=${id}` : '/motions');
  return {
    [CALL_API]: {
      endpoint: `${ARGU_API_URL}/api/${route}`,
      method: 'GET',
      types: [
        action.FETCH_MOTIONS_REQUEST,
        action.FETCH_MOTIONS_SUCCESS,
        action.FETCH_MOTIONS_FAILURE,
      ],
    },
  };
};

export {
  apiGetMotions,
};
