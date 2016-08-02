import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { GET_PERSON } from '../constants/actionTypes';
import Person from '../models/Person';

const initialState = new Map({
  items: new Map(),
});

const newPersonUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Person({ id });
};

const persons = (state = initialState, action) => {
  let record;
  switch (action.type) {
    case GET_PERSON:
      record = action.payload.record || newPersonUnlessExists(state, action.payload.id);
      return state.setIn(['items', record.get('id')], record);
    default:
      return state;
  }
};

export default persons;

export const getPersons = createSelector(
  [state => state.getIn(['persons', 'items'])],
  (ids) => {
    console.log(ids);
    return ids;
  }
);
