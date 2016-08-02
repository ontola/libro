// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import API from '../middleware/API';
import * as models from '../models';

const configureStore = (preloadedState) => {
  const apiMiddleware = new API(Object.values(models));
  let store;

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(apiMiddleware)
    );
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(apiMiddleware),
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
      )
    );
  }

  return store;
};

export default configureStore;
