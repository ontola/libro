import { CollapsibleStateTree } from './reducer';

export const getCollapsibleOpened = (state: CollapsibleStateTree, id: string): boolean =>
  !!state.collapsible.items[id]?.opened;
