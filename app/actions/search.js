import { createAction } from 'redux-actions';
import { CALL_API } from 'redux-api-middleware';
import { ELASTICSEARCH_DOCUMENT_BASE } from '../constants/config';
import * as action from '../constants/actionTypes';

const apiGetDocument = (id) => ({
  [CALL_API]: {
    endpoint: ELASTICSEARCH_DOCUMENT_BASE + id,
    method: 'GET',
    types: [
      action.FETCH_DOCUMENT_REQUEST,
      action.FETCH_DOCUMENT_SUCCESS,
      action.FETCH_DOCUMENT_FAILURE,
    ],
  },
});

const toggleDrawer = createAction(action.TOGGLE_DRAWER);
const setHitCount = createAction(action.SET_HIT_COUNT);

export {
  apiGetDocument,
  toggleDrawer,
  setHitCount,
};
