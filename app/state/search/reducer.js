import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
} from '../action-types';

const initialState = new Map({
  visible: false,
  hits: null,
  document: new Map(),
  loading: false,
});

const search = handleActions({
  [TOGGLE_DRAWER]: (state) =>
    Object.assign({}, state, {
      visible: !state.visible,
    }),
  [SET_HIT_COUNT]: (state, { payload }) =>
    Object.assign({}, state, {
      hits: payload,
    }),
  [FETCH_DOCUMENT_REQUEST]: (state) =>
    Object.assign({}, state, {
      document: {},
      loading: true,
    }),
  [FETCH_DOCUMENT_SUCCESS]: (state, { payload }) =>
    Object.assign({}, state, {
      document: payload.source,
      loading: false,
    }),
  [FETCH_DOCUMENT_FAILURE]: (state) =>
    Object.assign({}, state, {
      document: {},
      loading: true,
    }),
}, initialState);

export default search;
