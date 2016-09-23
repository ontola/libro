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

export const getVoteEventOptions = (option) => createSelector(
  [getVoteEventVotes, getVotes],
  (eventVotes, votes) =>
    eventVotes.filter(eventVote => votes.getIn([eventVote, 'option']) === option)
);

export const getVoteEventVotesCount = createSelector(
  [getVoteEventVotes],
  (votes) => votes.length
);

export const getVoteEventVotesSorted = (state, props) => {
  const options = {
    yes: {},
    no: {},
    abstain: {},
  };

  Object.keys(options).forEach(option => {
    const votes = getVoteEventOptions(option)(state, props);
    options[option].votes = votes;
    options[option].count = votes.length;
    options[option].percentage = calcPercentage(votes.length, getVoteEventVotesCount(state, props));
  });

  return options;
};
