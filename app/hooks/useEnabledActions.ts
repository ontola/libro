import rdf, { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useLRS,
} from 'link-redux';

import ontola from '../ontology/ontola';
import { isInvalidActionStatus } from '../views/Thing/properties/omniform/helpers';

export const invalidStatusIds = [
  schema.CompletedActionStatus,
  ontola.DisabledActionStatus,
  ontola.ExpiredActionStatus,
].map((s) => rdf.id(s));

export const actionIsAllowed = (lrs: LinkReduxLRSType, action: SomeNode): boolean => {
  const actionStatus = lrs.getResourceProperty(action, schema.actionStatus);

  return !isInvalidActionStatus(actionStatus);
};

export const useEnabledActions = (items: NamedNode[]): NamedNode[] => {
  const lrs = useLRS();

  useDataFetching(items);

  return items.filter((action) => actionIsAllowed(lrs, action));
};
