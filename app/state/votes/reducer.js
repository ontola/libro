import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import Vote from 'models/Vote';
import { SET_VOTE } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const record = (id, value) =>
  new Vote({ id, individual: true, value });

const votes = handleActions({
  [SET_VOTE]: (state, { payload }) =>
    state.setIn(['items', payload.motionId], record(payload.motionId, payload.side)),
}, initialState);

export default votes;
