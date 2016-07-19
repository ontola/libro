// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

function configureStore(initialState) {
  const middlewares = [
    apiMiddleware,
    thunk,
  ].filter(Boolean);

  const createStoreWithMiddleware = compose(
    applyMiddleware(...middlewares),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}

export default configureStore;
