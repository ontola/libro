import { createSelector } from 'reselect';

export const getCommunicationState = state => state.get('communication');

export const getLoadingBool = createSelector(
  getCommunicationState,
  state => state.get('isLoading')
);

export const getErrorBool = createSelector(
  getCommunicationState,
  state => state.get('isError')
);

export const getErrorMsg = createSelector(
  getCommunicationState,
  state => state.get('errorMessage')
);
