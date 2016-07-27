import { Map } from 'immutable';

const initialState = new Map({
  error: false,
  message: '',
});

const errors = (state = initialState, action) => {
  if (action.error) {
    const newState = {
      error: true,
      message: action.payload,
    };
    return state.merge(newState);
  }
  return state;
};

export default errors;
