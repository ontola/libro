import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export interface CollapsiblePayload {
  group: string;
  identifier: string;
  age: boolean;
}

/**
 * Close a single collapsible.
 * @function closeOne
 * @param {CollapsiblePayload}
 */
export const closeOne = createAction<CollapsiblePayload>(actions.COLL_CLOSE_ONE);

/**
 * Toggle the open state of a single collapsible
 * @function toggleOne
 * @param {String} identifier - Unique name of the collapsible
 */
export const toggleOne = createAction<string>(actions.COLL_TOGGLE_ONE);

export interface InitializeCollapsiblePayload {
  identifier: string;
  startOpened: boolean;
}

/**
 * Initialize a collapsible in the state
 * @function initializeCollapsible
 * @param {InitializeCollapsiblePayload}
 */
export const initializeCollapsible = createAction<InitializeCollapsiblePayload>(actions.COLL_ADD);
