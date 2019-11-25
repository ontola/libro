import rdf from '@ontologies/core';
import schema from '@ontologies/schema';

import { allowSort, entityIsLoaded } from '../../../../helpers/data';
import ontola from '../../../../ontology/ontola';

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

export const invalidStatusIds = [
  ontola.DisabledActionStatus,
  ontola.ExpiredActionStatus,
].map(s => rdf.id(s));

export const actionsAreAllDisabled = (items, lrs) => {
  const actionStatuses = items.map(a => rdf.id(lrs.getResourceProperty(a, schema.actionStatus)));

  return actionStatuses.every(a => invalidStatusIds.includes(a));
};
