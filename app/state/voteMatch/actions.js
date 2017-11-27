import { createAction } from 'redux-actions';

import * as actions from '../action-types';

import VoteMatch from './model';

export const fetchVoteMatch = id => VoteMatch.fetch(id);

export const voteMatchInit = createAction(actions.VOTE_MATCH_INIT);
export const voteMatchNextMotion = createAction(actions.VOTE_MATCH_NEXT);
export const voteMatchSave = createAction(actions.VOTE_MATCH_SAVE);
export const voteMatchUpdateMotions = createAction(actions.VOTE_MATCH_UPDATE_VOTEABLES);
export const voteMatchRemoveVoteable = createAction(actions.VOTE_MATCH_REMOVE_VOTEABLE);
export const voteMatchAddVoteable = createAction(actions.VOTE_MATCH_ADD_VOTEABLE);

export const voteMatchNext = () => (dispatch) => {
  dispatch(voteMatchNextMotion());
};

export const voteMatchStart = data => (dispatch) => {
  // Don't need this currently, since votematches are created on server
  dispatch(voteMatchInit(data));
  dispatch(voteMatchNext());
};

export const voteMatchTransitionTo = id => createAction(actions.VOTE_MATCH_TRANSITION_TO)({ id });
