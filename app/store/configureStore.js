// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(apiMiddleware),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}

export default configureStore;
