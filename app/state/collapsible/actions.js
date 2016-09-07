import { COLL_TOGGLE_ONE, COLL_TOGGLE_GROUP } from '../action-types';

export const toggleOne = (id) => ({
  type: COLL_TOGGLE_ONE,
  payload: {
    id,
  },
});

export const toggleAll = (group) => ({
  type: COLL_TOGGLE_GROUP,
  payload: {
    group,
  },
});
