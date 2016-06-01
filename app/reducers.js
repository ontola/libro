import { combineReducers } from 'redux';
import { FETCH_MOTIONS, FETCH_POLITICIANS, SET_ACTIVE_MOTION } from './actions';

function appData(state = [], action) {

  switch(action.type) {
    case FETCH_MOTIONS:
      return Object.assign({}, state, {
        motions: action.data
      })
    case FETCH_POLITICIANS:
      return Object.assign({}, state, {
        politicians: action.data
      })
    default:
      return state;
  }
}

function activeMotion(state = 0, action) {
  switch(action.type) {
    case SET_ACTIVE_MOTION:
      return action.index;
    default:
      return state;
  }
}

const motionsApp = combineReducers({
  appData,
  activeMotion
});

export default motionsApp;
