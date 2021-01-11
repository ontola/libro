import { NamedNode } from '@ontologies/core';
import { useReducer } from 'react';

export interface PredicateKeysType {
  [location: string]: string[];
}

export interface ReducerState {
  predicateKeys: PredicateKeysType;
  pristine: boolean;
  subject: NamedNode | null;
  subjectDirty: boolean;
}

export interface ReducerAction {
  predicateKeys?: PredicateKeysType;
  pristine?: boolean;
  subject?: NamedNode | null;
  subjectDirty?: boolean;
}

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => ({
  ...state,
  ...action,
});

export const useFormStateReducer = () => {
  return useReducer(reducer, {
    predicateKeys: {},
    pristine: false,
    subject: null,
    subjectDirty: false,
  });
};
