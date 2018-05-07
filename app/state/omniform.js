import { namedNodeByIRI } from 'link-lib';
import { createAction, handleActions } from 'redux-actions';
import { Map, Record, Set } from 'immutable';

import {
  OMNIFORM_ADD_ACTION,
  OMNIFORM_SET_ACTION,
  OMNIFORM_INITIALIZE,
  OMNIFORM_CLOSE_INLINE,
  OMNIFORM_OPEN_INLINE,
} from './action-types';

// Factory
export const OmniformRecord = Record({
  actions: new Set(),
  // NamedNode
  currentAction: undefined,
  inlineOpened: false,
  // Base64 encoded IRI
  parentIRI: undefined,
});

// Action Creators
export const omniformCloseInline = createAction(OMNIFORM_CLOSE_INLINE);
export const omniformInitialize = createAction(OMNIFORM_INITIALIZE);
export const omniformOpenInline = createAction(OMNIFORM_OPEN_INLINE);
export const omniformSetAction = createAction(OMNIFORM_SET_ACTION);
export const omniformAddAction = createAction(
  OMNIFORM_ADD_ACTION,
  (parentIRI, actionIRI) => ({ actionIRI, parentIRI })
);

// Reducer
const initialState = new Map({});

export const omniformReducer = handleActions({
  [OMNIFORM_ADD_ACTION]: (state, { payload }) => {
    const action = state.getIn([payload.parentIRI, 'actions']);

    const actionIRI = namedNodeByIRI(payload.actionIRI);
    if (action) {
      return state.setIn(
        [payload.parentIRI, 'actions'],
        action.add(actionIRI)
      );
    }

    const record = new OmniformRecord({
      actions: new Set([actionIRI]),
      parentIRI: payload.parentIRI
    });

    return state.set(payload.parentIRI, record);
  },
  [OMNIFORM_CLOSE_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], false),
  [OMNIFORM_INITIALIZE]: (state, { payload }) => {
    if (state.get(payload.parentIRI)) {
      return state;
    }

    return state.set(payload.parentIRI, new OmniformRecord({
      currentAction: payload.currentAction,
      parentIRI: payload.parentIRI
    }));
  },
  [OMNIFORM_OPEN_INLINE]: (state, { payload }) => state.setIn([payload, 'inlineOpened'], true),
  [OMNIFORM_SET_ACTION]: (state, { payload }) =>
    state.setIn([payload.parentIRI, 'currentAction'], payload.currentAction),
}, initialState);

// Selectors
export const getOmniformActions = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'actions']) || new Set();
export const getOmniformAction = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'currentAction']);
export const getOmniformOpenState = (state, parentIRI) => state.getIn(['omniform', parentIRI, 'inlineOpened']) || false;
