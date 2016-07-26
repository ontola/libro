import { Map } from 'immutable';

import {
  GET_ARGUMENT,
} from '../constants/actionTypes';
import Argument from '../models/Argument';

const initialState = new Map({
  items: new Map(),
});

const newArgumentUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Argument({ id });
};

const setArgument = (state, record) => state.setIn(
  ['items', record.get('id')],
  record
);

const argumentations = (state = initialState, action) => {
  let record;
  switch (action.type) {
    case GET_ARGUMENT:
      record = action.payload.record || newArgumentUnlessExists(state, action.payload.id);
      return setArgument(state, record);
    default:
      return state;
  }
};

export default argumentations;
