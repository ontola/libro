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
      return state.setIn(
        ['items', action.payload.record.get('id')],
        action.payload.record
      );
    default:
      return state;
  }
};

export default entities;
