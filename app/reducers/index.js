import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import hovercard from './hovercard';
import motions from './motions';
import search from './search';
import votes from './votes';

const rootReducer = combineReducers({
  votes,
  search,
  motions,
  hovercard,
  routing: routerReducer,
});

export default rootReducer;
