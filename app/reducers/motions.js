import { Map } from 'immutable';

import {
  GET_MOTION,
} from '../constants/actionTypes';

const initialState = new Map({
  items: new Map(),
});

const entities = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOTION:
      if (action.payload.record) {
        return state.setIn(
          ['items', action.payload.record.get('id')],
          action.payload.record
        );
      }
      break;

    default:
      return state;
  }

  return state;
};

export default entities;
