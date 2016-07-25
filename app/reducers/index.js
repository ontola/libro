import { combineReducers } from 'redux-immutable';

import motions from './motions';
import persons from './persons';
import router from './router';
import search from './search';


const rootReducer = combineReducers({
  search,
  motions,
  persons,
  router,
});

export default rootReducer;
