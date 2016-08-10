// import { createSelector } from 'reselect';

export const currentIndexSelector = state => state.getIn(['votematch', 'currentIndex']);
export const countMotionsSelector = state => state.getIn(['votematch', 'motionIds']).size;
