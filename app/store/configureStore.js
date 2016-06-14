// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const middlewares = [
      thunk,
      apiMiddleware
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
