import { NamedNode } from '@ontologies/core';
import { AnyObject } from 'final-form';
import { useReducer } from 'react';

export interface reducerState {
  intermediateValues: AnyObject;
  pristine: boolean;
  subject: NamedNode | null;
  subjectDirty: boolean;
}

export interface reducerAction {
  intermediateValues?: AnyObject;
  pristine?: boolean;
  subject?: NamedNode | null;
  subjectDirty?: boolean;
}

const reducer = (state: reducerState, action: reducerAction): reducerState => ({
    ...state, ...action
});

export const useFormStateReducer = () => {
  return useReducer(reducer, {
    intermediateValues: {},
    pristine: false,
    subject: null,
    subjectDirty: false
  });
};
