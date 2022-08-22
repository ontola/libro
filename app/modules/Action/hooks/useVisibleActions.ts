import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useLRS, 
} from 'link-redux';

import ontola from '../../Kernel/ontology/ontola';

export const invisibleStatusIds = [
  schema.CompletedActionStatus,
  ontola.DisabledActionStatus,
  ontola.ExpiredActionStatus,
].map((s) => rdf.id(s));

export const actionIsVisible = (lrs: LinkReduxLRSType, action: SomeNode): boolean => {
  const actionStatus = lrs.getResourceProperty(action, schema.actionStatus);

  return !isInvisibleActionStatus(actionStatus);
};

export const isInvisibleActionStatus = (actionStatus: SomeTerm | undefined): boolean => invisibleStatusIds.includes(rdf.id(
  actionStatus));

export function useVisibleActions(items: NamedNode[]): NamedNode[];
export function useVisibleActions(items: SomeNode[]): SomeNode[];
export function useVisibleActions(items: SomeNode[]): SomeNode[] {
  const lrs = useLRS();

  useDataFetching(items);

  return items.filter((action) => actionIsVisible(lrs, action));
}
