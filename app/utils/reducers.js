// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import motions from '../reducers/motions';
//import activeMotion from './activeMotion';

const rootReducer = combineReducers({
  motions,
  routing: routerReducer
});

export default rootReducer;
