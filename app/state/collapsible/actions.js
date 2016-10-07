import * as actions from '../action-types';

import { createAction } from 'redux-actions';

export const toggleOne = createAction(actions.COLL_TOGGLE_ONE);
export const toggleAll = createAction(actions.COLL_TOGGLE_GROUP);

// export const toggleAll = (group) => ({
//   type: actions.COLL_TOGGLE_GROUP,
//   payload: {
//     group,
//   },
// });

export const initializeCollapsible = createAction(actions.COLL_ADD);
