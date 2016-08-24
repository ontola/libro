import { Map } from 'immutable';
import * as actions from '../action-types';

const initialState = new Map({
  error: false,
  message: '',
});

const errors = (state = initialState, action) => {
  if (action.error) {
    return state.merge({
      error: true,
      message: action.payload.message,
    });
  } else if (action.type === actions.RESET_ERROR_MESSAGE) {
    return initialState;
  }
  return state;
};

export default errors;
