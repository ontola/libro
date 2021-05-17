import { connectRouter, routerMiddleware } from 'connected-react-router';
import { MemoryHistory } from 'history';
import {
  Store,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';

import apiMiddleware from '../middleware/api';

import * as reducers from './reducers';

const configureStore = (
  history: MemoryHistory,
  preloadedState?: unknown,
): Store => {
  let middleware;

  const appliedMiddleware = applyMiddleware(
    thunk,
    // @ts-ignore
    apiMiddleware(),
    routerMiddleware(history),
  );

  if (__PRODUCTION__) {
    middleware = appliedMiddleware;
  } else {
    middleware = compose(
      appliedMiddleware,
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : ((f: () => void) => f) as any,
    );
  }

  const createReducer = (asyncReducers = {}) => combineReducers({
    router: connectRouter(history),
    ...reducers,
    ...asyncReducers,
  });

  const store = createStore(
    // @ts-ignore
    enableBatching(createReducer()),
    preloadedState,
    middleware,
  );

  (store as any).asyncReducers = {};
  (store as any).injectReducer = (key: string, reducer: unknown) => {
    if ((store as any).asyncReducers[key] !== reducer) {
      (store as any).asyncReducers[key] = reducer;
      store.replaceReducer(createReducer((store as any).asyncReducers));
    }

    return store;
  };

  return store;
};

export default configureStore;
