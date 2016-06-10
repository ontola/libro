// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './utils/reducers';
import { promiseMiddleware } from './middleware/promise';
import { apiMiddleware } from './middleware/api';

const initialState = {
  appData: [],
  activeMotion: 0
};

const middlewares = [
  apiMiddleware,
  promiseMiddleware(),
  routerMiddleware(browserHistory)
].filter(Boolean);

const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
      return true;
    });
  }

  return store;
}
