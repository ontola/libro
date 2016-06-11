// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import motions from '../reducers/motions';

const rootReducer = combineReducers({
  motions,
  routing: routerReducer,
});

export default rootReducer;
