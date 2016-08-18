import { createSelector } from 'reselect';
import { getEventItemIds } from 'state/events/selectors';

export const getEventItemses = state => state.getIn(['eventItems', 'items']);

export const getEventItems = createSelector(
  getEventItemIds,
  getEventItemses,
  (ids, args) => {
    if (ids === undefined) {
      return [];
    }

    if (args.size === 0) {
      return [];
    }

    return ids.map(id => args.get(id));
  }
);
