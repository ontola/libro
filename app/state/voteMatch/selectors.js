import { createSelector } from 'reselect';

import VoteMatch from './model';

export const getVoteMatch = (state, props) => {
  state.getIn(['voteMatch', 'items', props.id]);
};

export const getVoteMatchName = (state, props) => state.getIn(['voteMatch', 'items', props.id, 'name']);

export const getVoteMatchCurrentIndex = state => state.getIn(['voteMatch', 'currentIndex']);

export const getCurrentVoteMatch = (state) => {
  const id = state.getIn(['voteMatch', 'currentVoteMatch']);
  return state.getIn(['voteMatch', 'items', id]) || new VoteMatch();
};

export const getVoteMatchMotionIds = (state, props) => state.getIn(['voteMatch', 'items', props.id, 'voteables']);

export const getVoteMatchMotionIdsLength = createSelector(
  getVoteMatchMotionIds,
  voteables => voteables.size
);

export const isVoteablePresentInVoteMatch = (state, props) => state.getIn(['voteMatch', 'items', props.id, 'voteables']).contains(props.voteable);
