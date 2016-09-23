import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';

import argumentations from './argumentations/reducer';
import collapsible from './collapsible/reducer';
import communication from './communication/reducer';
import motions from './motions/reducer';
import persons from './persons/reducer';
import router from './router/reducer';
import search from './search/reducer';
import votematch from './votematch/reducer';
import votes from './votes/reducer';
import voteEvents from './voteEvents/reducer';

import API from '../middleware/api';
import * as models from '../models';

const rootReducer = combineReducers({
  argumentations,
  collapsible,
  communication,
  motions,
  persons,
  router,
  search,
  votematch,
  votes,
  voteEvents,
});

const configureStore = (preloadedState) => {
  const apiMiddleware = new API(Object.values(models));
  let middleware;

  if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(thunk, apiMiddleware);
  } else {
    middleware = compose(
      applyMiddleware(thunk, apiMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  const store = createStore(
    enableBatching(rootReducer),
    preloadedState,
    middleware
  );

  return store;
};

export default configureStore;
