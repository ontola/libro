import { CALL_API } from 'redux-api-middleware';
import Immutable from 'immutable';

import { ARGU_API_URL } from '../constants/config';
import * as actions from '../constants/actionTypes';
import { Motion } from '../models/Motion';

const apiGetMotions = (id) => {
  const route = id ? `motions/?identifier=${id}` : 'motions';
  return {
    [CALL_API]: {
      endpoint: `${ARGU_API_URL}/api/${route}`,
      method: 'GET',
      types: [
        actions.FETCH_MOTIONS_REQUEST,
        {
          type: actions.FETCH_MOTIONS_SUCCESS,
          payload: (action, state, res) => res.json().then(payload =>
            Immutable
              .fromJS(payload)
              .map((motion) => new Motion(motion))
              .toMap()
            ),
        },
        actions.FETCH_MOTIONS_FAILURE,
      ],
    },
  };
};

export {
  apiGetMotions,
};
