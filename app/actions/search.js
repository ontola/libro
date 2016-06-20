import { createAction } from 'redux-actions';
import * as action from '../constants/actionTypes';

const toggleDrawer = createAction(action.TOGGLE_DRAWER);
const setHitCount = createAction(action.SET_HIT_COUNT);

export {
  toggleDrawer,
  setHitCount,
};
