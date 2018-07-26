import { linkMiddleware } from 'link-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';

import LinkedRenderStore from '../helpers/LinkedRenderStore';
import history from '../helpers/history';
import apiMiddleware from '../middleware/api';
import iframeNavigation from '../middleware/iframeNavigation';

import * as reducers from './reducers';

const configureStore = (preloadedState) => {
  let middleware;

  const appliedMiddleware = applyMiddleware(
    thunk,
    apiMiddleware,
    iframeNavigation,
    routerMiddleware(history),
    linkMiddleware(LinkedRenderStore)
  );

  if (process.env.NODE_ENV === 'production') {
    middleware = appliedMiddleware;
  } else {
    middleware = compose(
      appliedMiddleware,
      typeof window !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    );
  }

  return createStore(
    enableBatching(combineReducers(reducers)),
    preloadedState,
    middleware
  );
};

export default configureStore;
