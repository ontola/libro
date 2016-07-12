import { CALL_API } from 'redux-api-middleware';
import { ARGU_API_URL } from '../constants/config';
import * as action from '../constants/actionTypes';

const apiGetPersons = (id) => {
  const route = id ? `persons?id=${id}` : 'persons';

  return {
    [CALL_API]: {
      endpoint: `${ARGU_API_URL}/api/${route}`,
      method: 'GET',
      types: [
        action.FETCH_PERSONS_REQUEST,
        action.FETCH_PERSONS_SUCCESS,
        action.FETCH_PERSONS_FAILURE,
      ],
    },
  };
};

export {
  apiGetPersons,
};
