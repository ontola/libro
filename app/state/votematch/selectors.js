import { createSelector } from 'reselect';

export const getVoteMatchData = state => state.get('votematch');
export const getVoteMatches = state => state.getIn(['votematch', 'items']);
export const getUserVotes = state => state.getIn(['votes', 'items']);

export const getVoteMatchId = (state, props) => (props.params && props.params.userId) || props.id;

export const getVoteMatchCurrentIndex = createSelector(getVoteMatchData,
  votematch => votematch.get('currentIndex')
);

export const getCurrentVoteMatch = createSelector(
  [getVoteMatches, getVoteMatchId],
  (votematches, id) => votematches.get(id)
);

export const getVoteMatchMotions = createSelector(
  getCurrentVoteMatch,
  votematch => {
    if (votematch === undefined) {
      return [];
    }

    return votematch.get('motions');
  }
);

export const getVoteMatchMotionsLength = createSelector(
  getVoteMatchMotions,
  motions => motions.length
);
