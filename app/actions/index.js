import { createAction } from 'redux-actions';
import * as actions from '../constants/actionTypes';

export const resetErrorMessage = createAction(actions.RESET_ERROR_MESSAGE);
export const voteAction = createAction(actions.VOTE);
export const voteMatchInit = createAction(actions.VOTE_MATCH_INIT);
export const voteMatchNext = createAction(actions.VOTE_MATCH_NEXT);
export const voteMatchStart = data => dispatch => {
  dispatch(voteMatchInit(data));
  dispatch(voteMatchNext());
};
