import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';

import JsonApi from '../middleware/api';
import { ARGU_API_URL_EXT } from '../config';
import * as reducers from './reducers';
import * as models from '../models';

const apiMiddleware = new JsonApi({
  models: Object.values(models),
  apiBaseUrl: ARGU_API_URL_EXT,
});

const configureStore = (preloadedState) => {
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
    enableBatching(combineReducers(reducers)),
    preloadedState,
    middleware
  );

  return store;
};

export default configureStore;
