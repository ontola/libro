import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getVoteMatch = state => state.get('votematch');
export const getUserVotes = state => state.getIn(['motions', 'votes']);

export const getVoteMatchCurrentIndex = createSelector(getVoteMatch,
  votematch => votematch.get('currentIndex')
);

export const getVoteMatchMotions = createSelector(getVoteMatch,
  votematch => votematch.get('items')
);

export const getVoteMatchMotionsSize = createSelector(getVoteMatch,
  votematch => {
    if (votematch.get('items') === undefined) {
      return 0;
    }

    return votematch.get('items').size;
  }
);

export const getVoteMatchResults = createSelector([
  getVoteMatchMotions,
  getUserVotes,
], (
  motions,
  userVotes
) => {
  if (userVotes.size === 0) {
    return new Map();
  }

  return motions.valueSeq().map(val =>
    val.set('userVote', userVotes.getIn([
      val.get('motionId'),
      'value',
    ]))
  ).toMap();
});

const PERCENTAGE = 100;
const calcPercentage = (number, total) => (number / total) * PERCENTAGE;

export const getVoteMatchScore = createSelector([
  getVoteMatchResults,
], (results) => {
  let counter = 0;

  results.forEach(result => {
    if (result.get('compareResult') === result.get('userVote')) {
      counter++;
    }
  });

  return calcPercentage(counter, results.size);
});
