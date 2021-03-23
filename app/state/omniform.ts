import { NamedNode } from '@ontologies/core';
import { Map, Record } from 'immutable';
import { SomeNode } from 'link-lib';
import { createAction, handleActions } from 'redux-actions';

import {
  OMNIFORM_CLOSE_INLINE,
  OMNIFORM_INITIALIZE,
  OMNIFORM_OPEN_INLINE,
  OMNIFORM_SET_ACTION,
} from './action-types';

export interface OmniformRecordType {
  action: NamedNode | undefined;
  inlineOpened: false;
  parentIRI: string;
}

export type OmniformState = Map<string, OmniformRecordType>;

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
// @ts-ignore
const initialState = new Map<string, OmniformRecordType>({});

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

export const getOmniformAction = (state: OmniformState, parentIRI: SomeNode): NamedNode | undefined =>
  state.getIn(['omniform', parentIRI, 'action']);
export const getOmniformOpenState = (state: OmniformState, parentIRI: SomeNode): boolean =>
  state.getIn(['omniform', parentIRI, 'inlineOpened']) || false;
