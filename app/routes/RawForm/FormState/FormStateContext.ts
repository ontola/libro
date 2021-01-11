import React from 'react';
import { ReducerAction, ReducerState } from './useFormStateReducer';

export interface FormStateContextType {
  dispatch: (action: ReducerAction) => void;
  state: ReducerState;
}

// @ts-ignore
export const FormStateContext = React.createContext<FormStateContextType>();
