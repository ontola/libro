import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { setRecord } from 'helpers/reducers';
import { Person } from 'models';

import { GET_PERSON } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const persons = handleActions({
  [GET_PERSON]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id, Person),
}, initialState);

export default persons;
