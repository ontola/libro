import { handleActions } from 'redux-actions';
import { UPDATE_VOTE_TALLY } from '../constants/actionTypes';

const initialState = {
  all: [],
};

const votes = handleActions({
  [UPDATE_VOTE_TALLY]: (state, action) =>
    Object.assign({}, state, {
      all: [
        ...state.all,
        action.payload,
      ],
    }),
}, initialState);

export default votes;
