import { createSelector } from 'reselect';
import { calcPercentage } from 'helpers/numbers';

import { getMotionVoteEvents } from 'state/motions/selectors';
import { getVotes } from 'state/votes/selectors';

import VoteEvent from 'models/VoteEvent';

export const getVoteEvent = (state, props) => {
  const voteEventId = getMotionVoteEvents(state, props);
  return state.getIn(['voteEvents', 'items', voteEventId]) || new VoteEvent();
};

export const getVoteEventVotes = (state, props) =>
  getVoteEvent(state, props).get('votes');

export const getVoteEventResult = (state, props) =>
  getVoteEvent(state, props).get('result');

export const getVoteEventCounts = (state, props) =>
  getVoteEvent(state, props).get('counts');

export const getVoteEventVotesCount = createSelector(
  [getVoteEventVotes],
  (votes) => votes.length
);

export const getVoteEventOptions = (option) => createSelector(
  [getVoteEventVotes, getVotes],
  (eventVotes, votes) =>
    eventVotes.filter(eventVote => votes.getIn([eventVote, 'option']) === option)
);

export const getVoteEventVotesByOptions = (option) => createSelector(
  [getVoteEventVotes, getVotes],
  (eventVotes, votes) =>
    eventVotes.filter(eventVote => votes.getIn([eventVote, 'option']) === option)
);

export const getVoteEventVotesSorted = (state, props) => {
  const options = ['yes', 'no', 'abstain'];
  const aggs = {};

  options.forEach(option => {
    const votes = getVoteEventVotesByOptions(option)(state, props);
    Object.assign(aggs, {
      [option]: {
        count: votes.length,
        percentage: calcPercentage(votes.length, getVoteEventVotesCount(state, props)),
        votes,
      },
    });
  });

  return aggs;
};
