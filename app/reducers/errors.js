import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';

const initialState = new Map({
  error: false,
  message: '',
});

const errors = (state = initialState, action) => {
  if (action.error) {
    return state.merge({
      error: true,
      message: action.payload,
    });
  } else if (action.type === actions.RESET_ERROR_MESSAGE) {
    return null;
  }
  return state;
};

export default errors;
