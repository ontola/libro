import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useLRS,
} from 'link-redux';

import ontola from '../../Core/ontology/ontola';

export const invalidStatusIds = [
  schema.CompletedActionStatus,
  ontola.DisabledActionStatus,
  ontola.ExpiredActionStatus,
].map((s) => rdf.id(s));

export const actionIsAllowed = (lrs: LinkReduxLRSType, action: SomeNode): boolean => {
  const actionStatus = lrs.getResourceProperty(action, schema.actionStatus);

  return !isInvalidActionStatus(actionStatus);
};

export const isInvalidActionStatus = (actionStatus: SomeTerm | undefined): boolean => invalidStatusIds.includes(rdf.id(actionStatus));

export function useEnabledActions(items: NamedNode[]): NamedNode[];
export function useEnabledActions(items: SomeNode[]): SomeNode[];
export function useEnabledActions(items: SomeNode[]): SomeNode[] {
  const lrs = useLRS();

  useDataFetching(items);

  return items.filter((action) => actionIsAllowed(lrs, action));
}
