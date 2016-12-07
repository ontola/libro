import { createSelector } from 'reselect';
import { getVoteEvent } from 'state/voteEvents/selectors';

export const getCountId = (state, props) => {
  if (props.id) {
    return props.id;
  }

  return null;
};

export const getCounts = state => state.getIn(['counts', 'items']);

export const getCount = (state, props) =>
  state.getIn(['counts', 'items', getCountId(state, props)]);

export const getVoteEventCounts = (state, props) =>
  getVoteEvent(state, props).get('counts');

export const getVoteEventCountsByOptions = option => createSelector(
  [getVoteEventCounts, getCounts],
  (eventCounts, counts) =>
    eventCounts.filter(eventVote => counts.getIn([eventVote, 'option']) === option)
);

export const getVoteEventCountsSorted = (state, props) => {
  const options = ['yes', 'no', 'abstain'];
  const aggs = {};

  options.forEach((option) => {
    const counts = getVoteEventCountsByOptions(option)(state, props);
    Object.assign(aggs, {
      [option]: {
        counts,
      },
    });
  });

  return aggs;
};
