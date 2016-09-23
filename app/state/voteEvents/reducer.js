import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import { GET_VOTE_EVENT } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const voteEvents = handleActions({
  [GET_VOTE_EVENT]: (state, { payload }) => setRecord(state, payload.record),
}, initialState);

export default voteEvents;
