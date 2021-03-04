import { Map, Record } from 'immutable';
import { SomeNode } from 'link-lib';
import { createAction, handleActions } from 'redux-actions';

import {
  OMNIFORM_CLOSE_INLINE,
  OMNIFORM_INITIALIZE,
  OMNIFORM_OPEN_INLINE,
  OMNIFORM_SET_ACTION,
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
const initialState = new (Map as any)({});

export const omniformReducer = handleActions({
  [OMNIFORM_CLOSE_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], false),
  [OMNIFORM_INITIALIZE]: (state, { payload }) => {
    if (state.get(payload.parentIRI)) {
      return state;
    }

    return state.set(payload.parentIRI, new OmniformRecord({
      action: payload.action,
      parentIRI: payload.parentIRI,
    }));
  },
  [OMNIFORM_OPEN_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], true),
  [OMNIFORM_SET_ACTION]: (state, { payload }) => state.setIn([payload.parentIRI, 'action'], payload.action),
}, initialState);

// Selectors

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getOmniformAction = (state: any, parentIRI: SomeNode) => state.getIn(['omniform', parentIRI, 'action']);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getOmniformOpenState = (state: any, parentIRI: SomeNode) => state.getIn(['omniform', parentIRI, 'inlineOpened']) || false;
