import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import motions from './motions';
import search from './search';

const rootReducer = combineReducers({
  search,
  motions,
  routing: routerReducer,
});

export default rootReducer;
