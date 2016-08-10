import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';

import argumentations from './argumentations/reducer';
import errors from './errors/reducer';
import motions from './motions/reducer';
import persons from './persons/reducer';
import router from './router/reducer';
import search from './search/reducer';
import votematch from './votematch/reducer';

import API from '../middleware/api';
import * as models from '../models';

const rootReducer = combineReducers({
  argumentations,
  errors,
  motions,
  persons,
  router,
  search,
  votematch,
});

const configureStore = (preloadedState) => {
  const apiMiddleware = new API(Object.values(models));
  let store;

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      enableBatching(rootReducer),
      preloadedState,
      applyMiddleware(thunk, apiMiddleware)
    );
  } else {
    store = createStore(
      enableBatching(rootReducer),
      preloadedState,
      compose(
        applyMiddleware(thunk, apiMiddleware),
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
      )
    );
  }

  return store;
};

export default configureStore;
