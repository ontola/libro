import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  useDataFetching,
  useLRS,
} from 'link-redux';

import { allowSort } from '../../../../helpers/data';
import ontola from '../../../../ontology/ontola';

export const OMNIFORM_FILTER = [
  /\/m\/new/,
  /\/c\/new/,
  /\/pros\/new/,
  /\/cons\/new/,
  /\/actions\/create_opinion/,
  /\/actions\/update_opinion/,
];

const OMNIFORM_ORDER = [
  '/actions/create_opinion',
  '/actions/update_opinion',
  '/m/new',
  '/c/new',
  '/pros/new',
  '/cons/new',
];

export const invalidStatusIds = [
  schema.CompletedActionStatus,
  ontola.DisabledActionStatus,
  ontola.ExpiredActionStatus,
].map((s) => rdf.id(s));

const actionIsAllowed = (lrs, action) => {
  const actionStatus = lrs.getResourceProperty(action, schema.actionStatus);

  return !actionStatus || !invalidStatusIds.includes(rdf.id(actionStatus));
};

export const useActions = (items) => {
  const lrs = useLRS();
  const filteredItems = allowSort(items, OMNIFORM_FILTER, OMNIFORM_ORDER);

  useDataFetching(filteredItems);

  return filteredItems.filter((action) => actionIsAllowed(lrs, action));
};

export const actionsAreAllDisabled = (items, lrs) => (
  items.every((action) => !actionIsAllowed(lrs, action))
);
