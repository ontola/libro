import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
} from '../constants/actionTypes';

import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  visible: false,
  hits: null,
  document: {},
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        visible: !state.visible,
      });
    case SET_HIT_COUNT:
      return Object.assign({}, state, {
        hits: action.payload,
      });
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        hits: null,
      });
    case FETCH_DOCUMENT_REQUEST:
      return Object.assign({}, state, {
        document: {},
      });
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        document: action.payload._source,
      });
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        document: {},
      });

    default:
      return state;
  }
};

export default search;
