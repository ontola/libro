import { allowSort, entityIsLoaded } from '../../../../helpers/data';
import { NS } from '../../../../helpers/LinkedRenderStore';

export const OMNIFORM_FILTER = [
  /\/m\/new/,
  /\/c\/new/,
  /\/pros\/new/,
  /\/cons\/new/,
  /\/actions\/create_opinion/,
  /\/actions\/update_opinion/,
];

const ORDER = [
  '/actions/create_opinion',
  '/actions/update_opinion',
  '/m/new',
  '/c/new',
  '/pros/new',
  '/cons/new',
];

export const filterActions = (lrs, potentialAction) => {
  const actionCollection = potentialAction.find(action => /\/actions$/.test(action.value));
  if (__CLIENT__ && actionCollection && !entityIsLoaded(lrs, actionCollection)) {
    lrs.getEntity(actionCollection);

    return [];
  }

  return allowSort(potentialAction, OMNIFORM_FILTER, ORDER);
};

export const invalidStatuses = [NS.ontola('DisabledActionStatus'), NS.ontola('ExpiredActionStatus')];

export const actionsAreAllDisabled = (items, lrs) => {
  const actionStatuses = items.map(a => lrs.getResourceProperty(a, NS.schema('actionStatus')));

  return actionStatuses.every(a => invalidStatuses.includes(a));
};
