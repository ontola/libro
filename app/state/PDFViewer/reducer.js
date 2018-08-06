import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import * as actions from '../action-types';

const initialState = new Map({
  items: new Map(),
  showComments: true,
  zoomLevel: 1,
});

const PDFViewer = handleActions({
  [actions.PDF_SET_NUM_PAGES]: (state, { payload }) => state.setIn(['items', payload.id, 'numPages'], payload.numPages),
  [actions.PDF_SET_ROTATION]: (state, { payload }) => state.setIn(['items', payload.id, 'rotation'], payload.rotation),
  [actions.PDF_SET_SHOW_COMMENTS]: (state, { payload }) => state.setIn(['showComments'], payload),
  [actions.PDF_SET_ZOOM_LEVEL]: (state, { payload }) => state.setIn(['zoomLevel'], payload),
}, initialState);

export default PDFViewer;
