import { createAction } from 'redux-actions';
import * as actions from '../action-types';
import { voteAction } from 'state/votes/actions';
import VoteMatch from 'models/VoteMatch';

export const fetchVoteMatch = id => VoteMatch.fetch(id);

export const voteMatchInit = createAction(actions.VOTE_MATCH_INIT);
export const voteMatchNextMotion = createAction(actions.VOTE_MATCH_NEXT);
export const voteMatchSave = createAction(actions.VOTE_MATCH_SAVE);

export const voteMatchNext = data => (dispatch) => {
  if (data) {
    dispatch(voteAction(data));
  }
  dispatch(voteMatchNextMotion());
};

export const voteMatchStart = data => (dispatch) => {
  // Don't need this currently, since votematches are created on server
  dispatch(voteMatchInit(data));
  dispatch(voteMatchNext());
};
