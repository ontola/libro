import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entities from './entities';
import search from './search';

const rootReducer = combineReducers({
  search,
  entities,
  routing: routerReducer,
});

export default rootReducer;
