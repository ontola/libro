import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import motions from './motions';

const rootReducer = combineReducers({
  motions,
  routing: routerReducer,
});

export default rootReducer;
