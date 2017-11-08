import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  SET_HIT_COUNT,
  TOGGLE_DRAWER,
} from '../action-types';

const initialState = new Map({
  visible: false,
  hits: 0,
});

const searchElastic = handleActions({
  [TOGGLE_DRAWER]: state =>
    state.set('visible', !state.get('visible')),

  [SET_HIT_COUNT]: (state, { payload }) =>
    state.set('hits', payload),
}, initialState);

export default searchElastic;
