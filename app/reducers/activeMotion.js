import { SET_ACTIVE_MOTION } from '../actions/activeMotion';

function activeMotion(state = 0, action) {
  switch (action.type) {
    case 'SET_ACTIVE_MOTION':
      return action.index;
    default:
      return state;
  }
}

export default activeMotion;
