import { combineReducers } from 'redux-immutable';

import motions from './motions';
import search from './search';
import router from './router';

const rootReducer = combineReducers({
  search,
  motions,
  router,
});

export default rootReducer;
