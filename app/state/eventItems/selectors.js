import { createSelector } from 'reselect';

export const getEventItems = (state) => state.getIn(['eventItems', 'items']);
export const getEventItemId = (state, props) => props.id;

export const getEventItem = createSelector(
  [getEventItems, getEventItemId],
  (eventItems, id) => eventItems.get(id)
);
