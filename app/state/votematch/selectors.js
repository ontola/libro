import { createSelector } from 'reselect';

export const getVoteMatch = state => state.get('votematch');

export const getVoteMatchCurrentIndex = createSelector(getVoteMatch,
  votematch => votematch.get('currentIndex')
);

export const getVoteMatchMotions = createSelector(getVoteMatch,
  votematch => votematch.get('motionIds')
);

export const getVoteMatchMotionsSize = createSelector(getVoteMatch,
  votematch => votematch.get('motionIds').size
);

export const getVoteMatchCompareWithOpinions = createSelector(getVoteMatch,
  votematch => votematch.get('compareWithResults')
);

export const getVotes = state => state.getIn(['motions', 'votes']);

export const getVoteMatchResults = createSelector(
  getVoteMatchMotions,
  getVotes,
  (motions, votes) => {
    if (votes.size === 0) {
      return false;
    }

    return motions.map(id => ({
      motion: id,
      vote: votes.getIn([id, 'value']),
    }));
  }
);
