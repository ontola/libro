import { createSelector } from 'reselect';
import { calcPercentage } from 'helpers/numbers';
import { getUserVotes } from 'state/votes/selectors';
import { getMotionVoteEvents } from 'state/motions/selectors';
import { getVoteEvent } from 'state/voteEvents/selectors';
import { getCount } from 'state/counts/selectors';

import VoteMatch from 'models/VoteMatch';

export const getVoteMatches = state =>
  state.getIn(['voteMatch', 'items']);

export const getVoteMatch = (state, props) => {
  state.getIn(['voteMatch', 'items', props.id]);
};

export const getVoteMatchName = (state, props) =>
  state.getIn(['voteMatch', 'items', props.id, 'name']);

export const getVoteMatchCurrentIndex = state =>
  state.getIn(['voteMatch', 'currentIndex']);

export const getCurrentVoteMatch = (state) => {
  const id = state.getIn(['voteMatch', 'currentVoteMatch']);
  return state.getIn(['voteMatch', 'items', id]) || new VoteMatch();
};

export const getVoteMatchMotions = state =>
  getCurrentVoteMatch(state).get('voteables');

// Note: this function is quite expensive and should be memoized correctly using Reselect.
export const getVoteMatchComparedProfilePositions = (state, props) => {
  const positions = [];
  const motionIds = getVoteMatchMotions(state);
  const compareOrg = props.profileId;
  motionIds.forEach((motionId) => {
    const voteEvent = getMotionVoteEvents(state, { motionId });
    const countIds =
      getVoteEvent(state, { voteEvent })
        .get('counts');
    let option = 'undefined';
    countIds.forEach((countId) => {
      const count = getCount(state, { id: countId });
      if (count.group === compareOrg) {
        option = count.get('option');
      }
    });
    positions.push(option);
  });
  return positions;
};

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
