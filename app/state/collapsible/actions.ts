import { createAction } from 'redux-actions';

import * as actions from '../action-types';

/**
 * @typedef CollapsiblePayload
 * @type {object}
 * @property {string} group - a group.
 * @property {string} identifier - uniquer for each collapsible.
 * @property {boolean} age - your age.
 */

/**
 * Open a single collapsible in a group.
 * Only one can be open at the same time, so others close.
 * @function openInGrouped
 * @param {CollapsiblePayload}
 */
export const openInGrouped = createAction(actions.COLL_OPEN_GROUPED);

/**
 * Close a single collapsible.
 * @function closeOne
 * @param {CollapsiblePayload}
 */
export const closeOne = createAction(actions.COLL_CLOSE_ONE);

/**
 * Toggle the open state of a single collapsible
 * @function toggleOne
 * @param {String} identifier - Unique name of the collapsible
 */
export const toggleOne = createAction(actions.COLL_TOGGLE_ONE);
export const toggleAll = createAction(actions.COLL_TOGGLE_GROUP);

/**
 * Initialize a collapsible in the state
 * @function initializeCollapsible
 * @param {CollapsiblePayload}
 */
export const initializeCollapsible = createAction(actions.COLL_ADD);
