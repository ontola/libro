import {
  UPDATE_VOTE_TALLY,
} from '../constants/actionTypes';

const initialState = {
  count: 0,
};

const votes = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOTE_TALLY:
      return Object.assign({}, state, {
        count: action.payload,
      });

    default:
      return state;
  }
};

export default votes;
