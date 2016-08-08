import { combineReducers } from 'redux-immutable';

import argumentations from './arguments';
import compareVotes from './comparevotes';
import errors from './errors';
import motions from './motions';
import persons from './persons';
import router from './router';
import search from './search';
import votes from './votes';

const rootReducer = combineReducers({
  argumentations,
  compareVotes,
  errors,
  motions,
  persons,
  router,
  search,
  votes,
});

export default rootReducer;
