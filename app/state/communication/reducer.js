import { Map } from 'immutable';
import * as actions from '../action-types';

const initialState = new Map({
  isError: false,
  errorMessage: '',
  isLoading: false,
});

const communication = (state = initialState, action) => {
  if (action.payload && action.payload.loading) {
    return state.set('isLoading', true);
  }

  if (action.error) {
    return state.merge({
      isError: true,
      errorMessage: action.payload && action.payload.message,
    });
  }

  if (action.type === actions.RESET_ERROR_MESSAGE) {
    return initialState;
  }

  return state.set('isLoading', false);
};

export default communication;
