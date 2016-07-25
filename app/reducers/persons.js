import { Map } from 'immutable';

import {
  GET_PERSONS,
  GET_PERSON,
} from '../constants/actionTypes';

const initialState = new Map({
  items: new Map(),
});

const persons = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONS:
      if (action.payload.loading) {
        console.log(action.payload.loading);
      }
      break;

    case GET_PERSON:
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

export default persons;
