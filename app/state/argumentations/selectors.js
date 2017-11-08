import { createSelector } from 'reselect';

import { getMotionArgIds } from 'state/motions/selectors';

export const getArguments = state => state.getIn(['argumentations', 'items']);

export const getArgs = side => createSelector(
  getMotionArgIds,
  getArguments,
  (ids, args) => {
    if (ids === undefined || ids.length === 0 || args.size === 0) {
      return [];
    }

    return ids
      .map(id => args.get(id))
      .filter(arg => arg.get('side') === side);
  }
);

export const getArgsPro = (state, props) => getArgs('pro')(state, props);
export const getArgsCon = (state, props) => getArgs('con')(state, props);
