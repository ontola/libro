import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
} from '../action-types';

const initialState = new Map({
  visible: false,
  hits: null,
  document: new Map(),
  loading: false,
});

const search = handleActions({
  [TOGGLE_DRAWER]: (state) =>
    state.set('visible', !state.get('visible')),
  [SET_HIT_COUNT]: (state, { payload }) =>
    state.set('hits', payload),
  [FETCH_DOCUMENT_REQUEST]: (state) =>
    state.set('loading', true),
  [FETCH_DOCUMENT_SUCCESS]: (state, { payload }) =>
    state.merge({
      document: payload.source,
      loading: false,
    }),
}, initialState);

export default search;
