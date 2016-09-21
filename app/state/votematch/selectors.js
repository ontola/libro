import { createSelector } from 'reselect';
import { calcPercentage } from 'helpers/numbers';

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

export const getVoteMatchUserVotes = createSelector(
  [getUserVotes, getVoteMatchMotions],
  (votes, motions) => motions.map(motion => votes.getIn([motion, 'value']))
);

export const getVoteMatchComparedProfilePositions = createSelector(
  getCurrentVoteMatch,
  (votematch) => votematch.get('comparedProfilePositions')
);

export const getVoteMatchCountUserVotes = createSelector(
  [getVoteMatchUserVotes],
  (votes) => votes.filter(vote => vote !== undefined).length
);

export const getVoteMatchScore = createSelector(
  [getVoteMatchUserVotes, getVoteMatchComparedProfilePositions],
  (userVotes, compareVotes) => {
    let counter = 0;
    userVotes.forEach((result, i) => {
      if (result === compareVotes[i]) {
        counter++;
      }
    });
    return calcPercentage(counter, userVotes.length);
  }
);
