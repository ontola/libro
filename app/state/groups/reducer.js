import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import { GET_GROUP } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const groups = handleActions({
  [GET_GROUP]: (state, { payload }) =>
    setRecord(state, payload.record),
}, initialState);

export default groups;
