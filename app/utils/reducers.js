// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import motions from '../reducers/motions';
import activeMotion from '../reducers/activeMotion';

const rootReducer = combineReducers({
  motions,
  activeMotion,
  routing: routerReducer,
});

export default rootReducer;
