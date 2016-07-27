import { Map } from 'immutable';
import { GET_VOTE } from '../constants/actionTypes';
import Vote from '../models/Vote';

const initialState = new Map({
  items: new Map(),
});

const newVoteUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Vote({ id });
};

const setVote = (state, record) => state.setIn(
  ['items', record.id],
  record
);

const votes = (state = initialState, action) => {
  let record;
  switch (action.type) {
    case GET_VOTE:
      record = action.payload.record || newVoteUnlessExists(state, action.payload.id);
      return setVote(state, record);
    default:
      return state;
  }
};

export default votes;
