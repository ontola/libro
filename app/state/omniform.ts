import { SomeNode } from 'link-lib';
import React from 'react';

interface OmniformRecordType {
  action?: SomeNode;
  inlineOpened?: boolean;
  parentIRI?: string;
}

export type OmniformState = Record<string, OmniformRecordType>;

interface omniformContextType {
  omniformState: OmniformState;
  setOmniformState: React.Dispatch<React.SetStateAction<OmniformState>>;
}

// Reducer
export const omniformCloseInline = (state: OmniformState, payload: string): OmniformState => ({
  ...state,
  [payload]: {
    ...state[payload],
    inlineOpened: false,
  },
});

export const omniformOpenInline = (state: OmniformState, payload: string): OmniformState => ({
  ...state,
  [payload]: {
    ...state[payload],
    inlineOpened: true,
  },
});

export const omniformSetAction = (state: OmniformState, payload: OmniformRecordType): OmniformState => (
  payload.parentIRI ? {
    ...state,
    [payload.parentIRI]: {
      ...state[payload.parentIRI],
      action: payload.action,
    },
  } : state);

// Selectors
export const getOmniformAction = (state: OmniformState, parentIRI: string): SomeNode | undefined =>
  state[parentIRI]?.action;
export const getOmniformOpenState = (state: OmniformState, parentIRI: string): boolean =>
  state[parentIRI]?.inlineOpened ?? false;

export const omniformContext = React.createContext<omniformContextType>(undefined as any);
