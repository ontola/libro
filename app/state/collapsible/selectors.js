// import { createSelector } from 'reselect';

export const getCollapsible = (state, id) => state.getIn(['collapsible', 'items', id]);
