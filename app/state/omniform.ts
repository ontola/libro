import { NamedNode } from '@ontologies/core';
import { createAction, handleActions } from 'redux-actions';

import {
  OMNIFORM_CLOSE_INLINE,
  OMNIFORM_OPEN_INLINE,
  OMNIFORM_SET_ACTION,
} from './action-types';

interface OmniformRecordType {
  action: NamedNode | undefined;
  inlineOpened: false;
  parentIRI: string | undefined;
}

export type OmniformState = Record<string, OmniformRecordType | undefined>;
export type UnscopedOmniformState = { omniform: OmniformState };

// Action Creators
export const omniformCloseInline = createAction(OMNIFORM_CLOSE_INLINE);
export const omniformOpenInline = createAction(OMNIFORM_OPEN_INLINE);
export const omniformSetAction = createAction(OMNIFORM_SET_ACTION);

// Reducer
const initialState: OmniformState = {};

export const omniformReducer = handleActions<any, any>({
  [OMNIFORM_CLOSE_INLINE]: (state, { payload }) => ({
    ...state,
    [payload]: {
      ...state[payload],
      inlineOpened: false,
    },
  }),
  [OMNIFORM_OPEN_INLINE]: (state, { payload }) => ({
    ...state,
    [payload]: {
      ...state[payload],
      inlineOpened: true,
    },
  }),
  [OMNIFORM_SET_ACTION]: (state, { payload }) => ({
    ...state,
    [payload.parentIRI]: {
      ...state[payload.parentIRI],
      action: payload.action,
    },
  }),
}, initialState);

// Selectors

export const getOmniformAction = (state: UnscopedOmniformState, parentIRI: string): NamedNode | undefined =>
  state.omniform[parentIRI.toString()]?.action;
export const getOmniformOpenState = (state: UnscopedOmniformState, parentIRI: NamedNode): boolean =>
  state.omniform[parentIRI.toString()]?.inlineOpened ?? false;
