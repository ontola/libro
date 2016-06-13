import {
  FETCH_MOTIONS_REQUEST,
  FETCH_MOTIONS_SUCCESS,
  FETCH_MOTIONS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  items: [],
};

const motions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOTIONS_REQUEST:
      return Object.assign({}, state, {
        items: [],
      });

    case FETCH_MOTIONS_SUCCESS:
      return Object.assign({}, state, {
        items: action.payload,
      });

    case FETCH_MOTIONS_FAILURE:
      return Object.assign({}, state, {
        items: [],
      });

    default:
      return state;
  }
};

export default motions;
