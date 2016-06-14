import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import motions from './motions';
import votes from './votes';

const rootReducer = combineReducers({
  motions,
  votes,
  routing: routerReducer,
});

export default rootReducer;
