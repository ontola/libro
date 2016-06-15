import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import motions from './motions';
// import votes from './votes';
import hovercard from './hovercard';

const rootReducer = combineReducers({
  motions,
  hovercard,
  routing: routerReducer,
});

export default rootReducer;
