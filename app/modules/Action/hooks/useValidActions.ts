import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useLRS,
} from 'link-redux';

import ontola from '../../Kernel/ontology/ontola';

import { invisibleStatusIds } from './useVisibleActions';

export const invalidStatusIds = [
  ...invisibleStatusIds,
  rdf.id(ontola.LockedActionStatus),
];

export const actionIsValid = (lrs: LinkReduxLRSType, action: SomeNode): boolean => {
  const actionStatus = lrs.getResourceProperty(action, schema.actionStatus);

  return !isInvalidActionStatus(actionStatus);
};

export const isInvalidActionStatus = (actionStatus: SomeTerm | undefined): boolean => invalidStatusIds.includes(rdf.id(
  actionStatus));

export function useValidActions(items: NamedNode[]): NamedNode[];
export function useValidActions(items: SomeNode[]): SomeNode[];
export function useValidActions(items: SomeNode[]): SomeNode[] {
  const lrs = useLRS();

  useDataFetching(items);

  return items.filter((action) => actionIsValid(lrs, action));
}
