import { createAction, handleAction, handleActions } from 'redux-actions';
import * as action from '../constants/actionTypes';

const updateVoteTally = createAction(action.UPDATE_VOTE_TALLY);

export {
  updateVoteTally,
};
