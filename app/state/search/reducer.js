import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
} from '../action-types';

const initialState = new Map({
  visible: false,
  hits: 0,
});

const search = handleActions({
  [TOGGLE_DRAWER]: (state) =>
    state.set('visible', !state.get('visible')),

  [SET_HIT_COUNT]: (state, { payload }) =>
    state.set('hits', payload),
}, initialState);

export default search;
