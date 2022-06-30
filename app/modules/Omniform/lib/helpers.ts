import { NamedNode } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import { actionIsAllowed, useEnabledActions } from '../../Action/hooks/useEnabledActions';
import { allowSort } from '../../Common/lib/data';

const OMNIFORM_FILTER = [
  /\/m\/new/,
  /\/c\/new/,
  /\/pros\/new/,
  /\/cons\/new/,
];

const OMNIFORM_ORDER = [
  '/m/new',
  '/c/new',
  '/pros/new',
  '/cons/new',
];

export const useOmniformActions = (items: NamedNode[]): NamedNode[] => useEnabledActions(allowSort(items, OMNIFORM_FILTER, OMNIFORM_ORDER));

export const actionsAreAllDisabled = (items: NamedNode[], lrs: LinkReduxLRSType): boolean => (
  items.every((action) => !actionIsAllowed(lrs, action))
);

