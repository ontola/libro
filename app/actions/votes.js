import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes';

const updateVoteTally = createAction(types.UPDATE_VOTE_TALLY);

export {
  updateVoteTally,
};
