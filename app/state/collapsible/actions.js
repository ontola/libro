import { createAction } from 'redux-actions';

import * as actions from '../action-types';

/**
 * Toggle the open state of a single collapsible
 * @function toggleOne
 * @param {String} identifier - Unique name of the collapsible
 */
export const toggleOne = createAction(actions.COLL_TOGGLE_ONE);
export const toggleAll = createAction(actions.COLL_TOGGLE_GROUP);

export const initializeCollapsible = createAction(actions.COLL_ADD);
