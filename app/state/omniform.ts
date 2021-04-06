import { NamedNode } from '@ontologies/core';
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
  parentIRI: string | undefined;
}

export type UnscopedOmniformState = { omniform: Record<string, OmniformRecordType | undefined> };
export type OmniformState = Record<string, OmniformRecordType | undefined>;

// Factory
export const createOmniformRecord = (opts: Partial<OmniformRecordType>): OmniformRecordType => ({
  // NamedNode
  action: undefined,
  inlineOpened: false,
  // Base64 encoded IRI
  parentIRI: undefined,
  ...opts,
});

// Action Creators
export const omniformCloseInline = createAction(OMNIFORM_CLOSE_INLINE);
export const omniformOpenInline = createAction(OMNIFORM_OPEN_INLINE);
export const omniformSetAction = createAction(OMNIFORM_SET_ACTION);

// Reducer
const initialState: Record<string, OmniformRecordType | undefined> = {};

export const omniformReducer = handleActions<any, any>({
  [OMNIFORM_CLOSE_INLINE]: (state, { payload }) => ({
    ...state,
    [payload]: {
      ...state[payload],
      inlineOpened: false,
    },
  }),
  [OMNIFORM_INITIALIZE]: (state, { payload }) => {
    if (state[payload.parentIRI]) {
      return state;
    }

    return ({
      ...state,
      [payload.parentIRI]: createOmniformRecord({
        action: payload.action,
        parentIRI: payload.parentIRI,
      }),
    });
  },
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
