import {
  TOGGLE_DRAWER,
  SET_HIT_COUNT,
} from '../constants/actionTypes';

const initialState = {
  visible: false,
  hits: null,
};

const hovercard = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        visible: !state.visible,
      });
    case SET_HIT_COUNT:
      return Object.assign({}, state, {
        hits: action.payload,
      });

    default:
      return state;
  }
};

export default hovercard;
