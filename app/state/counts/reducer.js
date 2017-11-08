import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { setRecord } from 'helpers/reducers';

import { GET_COUNT } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const counts = handleActions({
  [GET_COUNT]: (state, { payload }) => setRecord(state, payload.record),
}, initialState);

export default counts;
