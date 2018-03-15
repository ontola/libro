import { createAction, handleActions } from 'redux-actions';
import { Map, Record } from 'immutable';

import { OMNIFORM_SET_TYPE, OMNIFORM_INITIALIZE } from '../action-types';

// Factory
export const OmniformRecord = Record({
  currentType: undefined,
  parentIRI: undefined,
});

// Action Creators
export const omniformInitialize = createAction(OMNIFORM_INITIALIZE);
export const omniformSetType = createAction(OMNIFORM_SET_TYPE);

// Reducer
const initialState = new Map({});

export const omniformReducer = handleActions({
  [OMNIFORM_INITIALIZE]: (state, { payload }) =>
    state.set(payload.parentIRI, new OmniformRecord({
      currentType: payload.currentType,
      parentIRI: payload.parentIRI
    })),
  [OMNIFORM_SET_TYPE]: (state, { payload }) =>
    state.setIn([payload.parentIRI, 'currentType'], payload.currentType),
}, initialState);

// Selectors
export const getOmniformType = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'currentType']);
