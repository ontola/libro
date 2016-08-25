import { createAction } from 'redux-actions';
import * as actions from '../action-types';
import { voteAction } from 'state/motions/actions';

export const voteMatchInit = createAction(actions.VOTE_MATCH_INIT);
export const voteMatchNextMotion = createAction(actions.VOTE_MATCH_NEXT);

export const voteMatchNext = data => dispatch => {
  if (data) {
    dispatch(voteAction(data));
  }
  dispatch(voteMatchNextMotion());
};

export const voteMatchStart = data => dispatch => {
  dispatch(voteMatchInit(data));
  dispatch(voteMatchNext());
};
