import {
  FETCH_MOTIONS_REQUEST,
  FETCH_MOTIONS_SUCCESS,
  FETCH_MOTIONS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: false,
};

const motions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOTIONS_REQUEST:
      return Object.assign({}, state, {
        items: [],
        loading: true,
      });

    case FETCH_MOTIONS_SUCCESS:
      return Object.assign({}, state, {
        items: action.payload,
        loading: false,
      });

    case FETCH_MOTIONS_FAILURE:
      return Object.assign({}, state, {
        items: [],
        loading: false,
      });

    default:
      return state;
  }
};

export default motions;
