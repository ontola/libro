import { Map } from 'immutable';

import {
  GET_ARGUMENT,
} from '../constants/actionTypes';

const initialState = new Map({
  items: new Map(),
});

const argumentations = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARGUMENT: {
      const record = action.payload.record;
      if (record) {
        return state.setIn(['items', record.get('id')], record);
      }
      break;
    }

    default:
      return state;
  }
  return state;
};

export default argumentations;
