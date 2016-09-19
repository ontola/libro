import * as actions from '../action-types';

import { createAction } from 'redux-actions';

export const toggleOne = createAction(actions.COLL_TOGGLE_ONE);

// export const toggleOne = (id) => ({
//   type: COLL_TOGGLE_ONE,
//   payload: {
//     id,
//   },
// });

export const toggleAll = (group) => ({
  type: actions.COLL_TOGGLE_GROUP,
  payload: {
    group,
  },
});

export const initializeCollapsible = createAction(actions.COLL_ADD);
