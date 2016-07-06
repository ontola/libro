import { handleActions } from 'redux-actions';
import { UPDATE_VOTE_TALLY } from '../constants/actionTypes';

const initialState = {
  all: [],
};

const votes = handleActions({
  [UPDATE_VOTE_TALLY]: (state, action) => {
    const hasVoted = state.all.find(vote => vote.identifier === action.payload.identifier);
    if (hasVoted === undefined) {
      return Object.assign({}, state, {
        all: [
          ...state.all,
          action.payload,
        ],
      });
    }
    return state;
  },
}, initialState);

export default votes;
