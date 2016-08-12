import { createSelector } from 'reselect';

export const getErrorsState = state => state.get('errors');

export const getErrorBool = createSelector(
  getErrorsState,
  state => state.get('error')
);

export const getErrorMsg = createSelector(
  getErrorsState,
  state => state.get('message')
);
