import { combineReducers } from 'redux-immutable';

import argumentations from './arguments';
import motions from './motions';
import persons from './persons';
import router from './router';
import search from './search';
import votes from './votes';

const rootReducer = combineReducers({
  argumentations,
  motions,
  persons,
  router,
  search,
  votes,
});

export default rootReducer;
