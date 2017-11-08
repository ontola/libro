import { createAction } from 'redux-actions';

import * as actions from '../action-types';

const toggleDrawer = createAction(actions.TOGGLE_DRAWER);
const setHitCount = createAction(actions.SET_HIT_COUNT);

export {
  toggleDrawer,
  setHitCount,
};
