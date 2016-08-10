import { createAction } from 'redux-actions';
import { CALL_API } from 'redux-api-middleware';
import { ELASTICSEARCH_DOCUMENT_BASE } from '../../config';
import * as actions from '../action-types';

const apiGetDocument = (id) => ({
  [CALL_API]: {
    endpoint: ELASTICSEARCH_DOCUMENT_BASE + id,
    method: 'GET',
    types: [
      actions.FETCH_DOCUMENT_REQUEST,
      {
        type: actions.FETCH_DOCUMENT_SUCCESS,
        payload: (action, state, res) => res.json().then(({ _source: source }) => source),
      },
      actions.FETCH_DOCUMENT_FAILURE,
    ],
  },
});

const toggleDrawer = createAction(actions.TOGGLE_DRAWER);
const setHitCount = createAction(actions.SET_HIT_COUNT);

export {
  apiGetDocument,
  toggleDrawer,
  setHitCount,
};
