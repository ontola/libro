import { createSelector } from 'reselect';
import { getMotionArgIds } from 'state/motions/selectors';

export const getArguments = state => state.getIn(['argumentations', 'items']);

export const getArgs = createSelector(
  getMotionArgIds,
  getArguments,
  (ids, args) => {
    if (ids === undefined) {
      return [];
    }

    if (ids.length === 0) {
      return [];
    }

    if (args.size === 0) {
      return [];
    }

    return ids.map(id => args.get(id));
  }
);
