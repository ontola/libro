import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import motions from './motions';
import persons from './persons';
import search from './search';
import votes from './votes';

const rootReducer = combineReducers({
  votes,
  search,
  motions,
  persons,
  routing: routerReducer,
});

export default rootReducer;
