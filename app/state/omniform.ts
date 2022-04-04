import { NamedNode } from '@ontologies/core';
import * as owl from '@ontologies/owl';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useDataFetching,
  useGlobalIds,
} from 'link-redux';
import React, { SyntheticEvent } from 'react';

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
export const omniformCloseInline = (payload: string) => (state: OmniformState): OmniformState => ({
  ...state,
  [payload]: {
    ...state[payload],
    inlineOpened: false,
  },
});

export const omniformOpenInline = (payload: string) => (state: OmniformState): OmniformState => ({
  ...state,
  [payload]: {
    ...state[payload],
    inlineOpened: true,
  },
});

export const omniformSetAction = (payload: OmniformRecordType) => (state: OmniformState): OmniformState => (
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

export const useOmniformClose = (parent: SomeNode): () => void => {
  const { setOmniformState } = React.useContext(omniformContext);

  return React.useCallback(
    () => setOmniformState(omniformCloseInline(parent.value)),
    [parent, setOmniformState],
  );
};

export const useOmniformOpen = (parent: SomeNode): () => void => {
  const { setOmniformState } = React.useContext(omniformContext);

  return React.useCallback(
    () => setOmniformState(omniformOpenInline(parent.value)),
    [parent, setOmniformState],
  );
};

export const useOmniformChangeFactory = (parentIRI: string): (action: SomeNode) => () => void => {
  const { setOmniformState } = React.useContext(omniformContext);

  return (action: SomeNode) => () => {
    setOmniformState(omniformSetAction({
      action: action,
      parentIRI,
    }));
  };
};

export const useOmniformOpenAction = (parent: SomeNode, action: SomeNode): (e: SyntheticEvent<any> | null) => void => {
  const { setOmniformState } = React.useContext(omniformContext);

  return React.useCallback((e: SyntheticEvent<any> | null) => {
    e?.preventDefault();

    setOmniformState(omniformOpenInline(parent.value));
    setOmniformState(omniformSetAction({
      action,
      parentIRI: btoa(parent.value),
    }));
  }, [parent, action, setOmniformState]);
};

// The NamedNode of the currently selected form.
export const useOmniformActiveAction = (parentIRI: string): LaxNode => {
  const { omniformState } = React.useContext(omniformContext);

  return getOmniformAction(omniformState, parentIRI);
};

export const useOmniformOpenedState = (parent: SomeNode): boolean => {
  const sameAs = useGlobalIds(parent, owl.sameAs);
  useDataFetching(sameAs);

  const { omniformState } = React.useContext(omniformContext);

  return getOmniformOpenState(omniformState, parent.value) || !!sameAs.find((sAs: NamedNode) => getOmniformOpenState(omniformState, sAs.value));
};
