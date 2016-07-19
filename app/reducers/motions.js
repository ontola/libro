import {
  FETCH_MOTIONS_REQUEST,
  FETCH_MOTIONS_SUCCESS,
  FETCH_MOTIONS_FAILURE,
} from '../constants/actionTypes';

import { MotionMap } from '../models/Motion';

const initialState = new MotionMap();

const motions = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_MOTIONS_REQUEST:
    //   return Object.assign({}, state, {
    //     loading: true,
    //   });

    case FETCH_MOTIONS_SUCCESS:
      return state.merge(action.payload);

    case FETCH_MOTIONS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
};

export default motions;
