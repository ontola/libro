import { createAction } from 'redux-actions';

import * as actions from '../action-types';

/**
 * Close a single Closeable.
 * @function close
 * @param {CloseablePayload}
 */
export const closeCloseable = createAction(actions.CLOSEABLE_CLOSE);

/**
 * Initialize a Closeable in the state
 * @function initializeCloseable
 * @param {CloseablePayload}
 */
export const initializeCloseable = createAction(actions.CLOSEABLE_ADD);
