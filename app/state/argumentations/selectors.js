import { createSelector } from 'reselect';

export const argumentIdsFromMotion = (state, ownProps) => {
  const motionId = ownProps.params !== undefined ? ownProps.params.motionId : ownProps.motionId;
  return state.getIn([
    'motions',
    'items',
    motionId,
    'arguments',
  ]);
};

export const argumentsSelector = state => state.getIn(['argumentations', 'items']);

export const argsSelector = createSelector(
  argumentIdsFromMotion,
  argumentsSelector,
  (ids, argumentations) => {
    if (ids !== undefined) {
      return ids.map(id => argumentations.get(id));
    }
    return [];
  }
);
