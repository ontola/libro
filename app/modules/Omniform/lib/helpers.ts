import { NamedNode } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import { allowSort } from '../../../helpers/data';
import {
  actionIsAllowed,
  useEnabledActions,
} from '../../../hooks/useEnabledActions';

const OMNIFORM_FILTER = [
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

export const useOmniformActions = (items: NamedNode[]): NamedNode[] => useEnabledActions(allowSort(items, OMNIFORM_FILTER, OMNIFORM_ORDER));

export const actionsAreAllDisabled = (items: NamedNode[], lrs: LinkReduxLRSType): boolean => (
  items.every((action) => !actionIsAllowed(lrs, action))
);

