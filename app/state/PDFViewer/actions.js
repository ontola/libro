import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const setNumPages = createAction(actions.PDF_SET_NUM_PAGES);
export const setRotation = createAction(actions.PDF_SET_ROTATION);
export const setShowComments = createAction(actions.PDF_SET_SHOW_COMMENTS);
export const setZoomLevel = createAction(actions.PDF_SET_ZOOM_LEVEL);
