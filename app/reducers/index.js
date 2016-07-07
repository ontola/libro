import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import hovercard from './hovercard';
import motions from './motions';
import persons from './persons';
import search from './search';
import votes from './votes';

const rootReducer = combineReducers({
  votes,
  search,
  motions,
  persons,
  hovercard,
  routing: routerReducer,
});

export default rootReducer;
