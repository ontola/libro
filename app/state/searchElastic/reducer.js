import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  SET_HIT_COUNT,
  TOGGLE_DRAWER,
} from '../action-types';

const initialState = new Map({
  hits: 0,
  visible: false,
});

const searchElastic = handleActions({
  [SET_HIT_COUNT]: (state, { payload }) =>
    state.set('hits', payload),

  [TOGGLE_DRAWER]: state =>
    state.set('visible', !state.get('visible')),
}, initialState);

export default searchElastic;
