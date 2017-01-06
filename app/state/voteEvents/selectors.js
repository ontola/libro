import { createSelector } from 'reselect';
import { calcPercentage } from 'helpers/numbers';

import { getVotes } from 'state/votes/selectors';

// import { getMotionVoteEvents } from 'state/motions/selectors';
// import VoteEvent from 'models/VoteEvent';

// export const getVoteEvent = (state, props) => {
//   const voteEventIds = getMotionVoteEvents(state, props);
//   const eventId = voteEventIds && Object.values(voteEventIds)[0];
//   const voteEvent = state.getIn(['voteEvents', 'items', eventId]) || new VoteEvent();
//   return voteEvent;
// };

export const getVoteEvents = state =>
  state.getIn(['voteEvents', 'items']);

export const getVoteEventId = (state, props) =>
  props.voteEventId;

export const getVoteEvent = createSelector(
  [getVoteEvents, getVoteEventId],
  (voteEvents, id) => voteEvents && voteEvents.get(id)
);

export const getVoteEventVotes = createSelector(
  [getVoteEvent],
  voteEvent => voteEvent && voteEvent.get('votes')
);

export const getVoteEventOptionCounts = (state, props) =>
  getVoteEvent(state, props).get('optionCounts');

export const getVoteEventResult = (state, props) =>
  getVoteEvent(state, props).get('result');

export const getVoteEventStartDate = (state, props) =>
  getVoteEvent(state, props).get('startDate');

export const getVoteEventEndDate = (state, props) =>
  getVoteEvent(state, props).get('endDate');

export const getVoteEventLegislativeSession = (state, props) =>
  getVoteEvent(state, props).get('legislativeSession');

export const getVoteEventOrganization = (state, props) =>
  getVoteEvent(state, props).get('organization');

export const getVoteEventVotesCount = createSelector(
  [getVoteEventVotes],
  votes => votes.length
);

export const getVoteEventOptions = option => createSelector(
  [getVoteEventVotes, getVotes],
  (eventVotes, votes) =>
    eventVotes && eventVotes.filter(eventVote => votes.getIn([eventVote, 'option']) === option)
);

export const getVoteEventVotesByOptions = option => createSelector(
  [getVoteEventVotes, getVotes],
  (eventVotes, votes) =>
    eventVotes && eventVotes.filter(eventVote => votes.getIn([eventVote, 'option']) === option)
);

export const getVoteEventVotesSorted = (state, props) => {
  const options = ['yes', 'no', 'abstain'];
  const aggs = {};

  options.forEach((option) => {
    const votes = getVoteEventVotesByOptions(option)(state, props);
    Object.assign(aggs, {
      [option]: {
        count: votes && votes.length,
        percentage: votes && calcPercentage(votes.length, getVoteEventVotesCount(state, props)),
        votes,
      },
    });
  });

  return aggs;
};
