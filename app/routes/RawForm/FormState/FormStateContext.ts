import React from 'react';
import { reducerAction, reducerState } from './useFormStateReducer';

export interface FormStateContextType {
  dispatch: (action: reducerAction) => void;
  state: reducerState;
}

// @ts-ignore
export const FormStateContext = React.createContext<FormStateContextType>();
