import { Map } from 'immutable';

import {
  GET_PERSON,
} from '../constants/actionTypes';

const initialState = new Map({
  items: new Map(),
});

const persons = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSON: {
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

export default persons;
