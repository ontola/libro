import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';

import { serviceWorkerCommunicator } from '../helpers/LinkedRenderStore';
import history from '../helpers/history';
import apiMiddleware from '../middleware/api';

import * as reducers from './reducers';

const configureStore = (preloadedState) => {
  let middleware;

  const appliedMiddleware = applyMiddleware(
    thunk,
    apiMiddleware(history, serviceWorkerCommunicator),
    routerMiddleware(history)
  );

  if (__PRODUCTION__) {
    middleware = appliedMiddleware;
  } else {
    middleware = compose(
      appliedMiddleware,
      typeof window !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    );
  }

  const createReducer = (asyncReducers = {}) => combineReducers({
    router: connectRouter(history),
    ...reducers,
    ...asyncReducers,
  });

  const store = createStore(
    enableBatching(createReducer()),
    preloadedState,
    middleware
  );

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    if (store.asyncReducers[key] !== reducer) {
      store.asyncReducers[key] = reducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    }
    return store;
  };

  return store;
};

export default configureStore;
