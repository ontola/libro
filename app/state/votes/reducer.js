import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import Vote from 'models/Vote';
import { GET_VOTE, SET_VOTE } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const voteRecord = (id, value) => new Vote({ id, individual: true, value });

const votes = handleActions({
  [GET_VOTE]: (state, { payload }) =>
    setRecord(state, payload.record),

  [SET_VOTE]: (state, { payload }) =>
    setRecord(state, voteRecord(payload.motionId, payload.side), payload.motionId),
}, initialState);

export default votes;
