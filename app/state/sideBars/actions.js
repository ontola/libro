import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const closeSideBar = createAction(actions.SIDEBAR_CLOSE);
export const dockSideBar = createAction(actions.SIDEBAR_DOCK);
export const initializeSideBar = createAction(actions.SIDEBAR_ADD);
export const openSideBar = createAction(actions.SIDEBAR_OPEN);
export const undockSideBar = createAction(actions.SIDEBAR_UNDOCK);
