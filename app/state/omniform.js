import { createAction, handleActions } from 'redux-actions';
import { Map, Record } from 'immutable';

import {
  OMNIFORM_SET_ACTION,
  OMNIFORM_INITIALIZE,
  OMNIFORM_CLOSE_INLINE,
  OMNIFORM_OPEN_INLINE,
} from './action-types';

// Factory
export const OmniformRecord = Record({
  // NamedNode
  action: undefined,
  inlineOpened: false,
  // Base64 encoded IRI
  parentIRI: undefined,
});

// Action Creators
export const omniformCloseInline = createAction(OMNIFORM_CLOSE_INLINE);
export const omniformOpenInline = createAction(OMNIFORM_OPEN_INLINE);
export const omniformSetAction = createAction(OMNIFORM_SET_ACTION);

// Reducer
const initialState = new Map({});

export const omniformReducer = handleActions({
  [OMNIFORM_CLOSE_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], false),
  [OMNIFORM_INITIALIZE]: (state, { payload }) => {
    if (state.get(payload.parentIRI)) {
      return state;
    }

    return state.set(payload.parentIRI, new OmniformRecord({
      action: payload.action,
      parentIRI: payload.parentIRI
    }));
  },
  [OMNIFORM_OPEN_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], true),
  [OMNIFORM_SET_ACTION]: (state, { payload }) =>
    state.setIn([payload.parentIRI, 'action'], payload.action),
}, initialState);

// Selectors
export const getOmniformAction = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'action']);
export const getOmniformOpenState = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'inlineOpened']) || false;
