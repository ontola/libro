import { handleActions } from 'redux-actions';
// import { UPDATE_VOTE_TALLY } from '../constants/actionTypes';
import { updateVoteTally } from '../actions/votes';

const initialState = {
  counter: 0,
};

const votes = handleActions({
  [updateVoteTally]: (state, action) => ({
    counter: state.counter + action.payload,
  }),
}, initialState);

export default votes;
