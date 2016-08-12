import { createSelector } from 'reselect';

export const getVoteMatch = state => state.get('votematch');

export const getVoteMatchCurrentIndex = createSelector(
  getVoteMatch,
  votematch => votematch.get('currentIndex')
);

export const getVoteMatchMotionsSize = createSelector(
  getVoteMatch,
  votematch => votematch.get('motionIds').size
);
