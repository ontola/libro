import { createSelector } from 'reselect';
import { calcPercentage } from 'helpers/numbers';
import { getUserVotes } from 'state/votes/selectors';

import VoteMatch from 'models/VoteMatch';

export const getVoteMatches = state =>
  state.getIn(['votematch', 'items']);

export const getVoteMatchCurrentIndex = state =>
  state.getIn(['votematch', 'currentIndex']);

export const getCurrentVoteMatch = (state) => {
  const id = state.getIn(['votematch', 'currentVoteMatch']);
  return state.getIn(['votematch', 'items', id]) || new VoteMatch();
};

export const getVoteMatchMotions = state =>
  getCurrentVoteMatch(state).get('motions');

export const getVoteMatchComparedProfilePositions = state =>
  getCurrentVoteMatch(state).get('comparedProfilePositions');

export const getVoteMatchMotionsLength = createSelector(
  getVoteMatchMotions,
  motions => motions.length
);

export const getVoteMatchUserVotes = createSelector(
  [getUserVotes, getVoteMatchMotions],
  (votes, motions) => motions.map(motion => votes.getIn([motion, 'option']))
);

export const getVoteMatchCountUserVotes = createSelector(
  [getVoteMatchUserVotes],
  votes => votes.filter(vote => vote !== undefined).length
);

export const getVoteMatchSimilarity = createSelector(
  [getVoteMatchUserVotes, getVoteMatchComparedProfilePositions],
  (userVotes, compareVotes) => {
    const countSimilarities = userVotes
      .filter((userVote, i) => userVote === compareVotes[i])
      .length;

    if (countSimilarities === 0) {
      return 0;
    }

    return calcPercentage(countSimilarities, userVotes.length);
  }
);
