import { createAction } from 'redux-actions';
import * as actions from '../constants/actionTypes';

export const resetErrorMessage = createAction(actions.RESET_ERROR_MESSAGE);
export const voteMatchStart = createAction(actions.VOTE_MATCH_START);
export const voteMatchNext = createAction(actions.VOTE_MATCH_NEXT);
