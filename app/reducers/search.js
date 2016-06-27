import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  visible: false,
  hits: null,
  document: {},
  loading: false,
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
    case FETCH_DOCUMENT_REQUEST:
      return Object.assign({}, state, {
        document: {},
        loading: true,
      });
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        document: action.payload.source,
        loading: false,
      });
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        document: {},
        loading: true,
      });
    default:
      return state;
  }
};

export default search;
