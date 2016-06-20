import {
  SET_HOVER_CARD,
  REMOVE_HOVER_CARD,
} from '../constants/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  content: {},
  hide: true,
};

const hovercard = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVER_CARD:
      return Object.assign({}, state, {
        content: action.payload,
        hide: false,
      });
    case LOCATION_CHANGE:
    case REMOVE_HOVER_CARD:
      return Object.assign({}, state, {
        content: {},
        hide: true,
      });

    default:
      return state;
  }
};

export default hovercard;
