import { Map } from 'immutable';

import * as actions from '../action-types';

const initialState = new Map({
  errorMessage: '',
  isError: false,
  isLoading: false,
});

const communication = (state = initialState, action) => {
  if (action.payload && action.payload.loading) {
    return state.set('isLoading', true);
  }

  if (action.error) {
    let message = action.payload && action.payload.message;
    if (typeof action.payload === 'string') {
      message = action.payload;
    }

    if (!message && state.get('errorMessage')) {
      return state;
    }

    return state.merge({
      errorMessage: message,
      isError: true,
    });
  }

  if (action.type === actions.RESET_ERROR_MESSAGE) {
    return initialState;
  }

  return state.set('isLoading', false);
};

export default communication;
