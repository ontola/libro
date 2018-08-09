import { linkMiddleware } from 'link-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import LogRocket from 'logrocket';

import LinkedRenderStore from '../helpers/LinkedRenderStore';
import history from '../helpers/history';
import apiMiddleware from '../middleware/api';
import iframeNavigation from '../middleware/iframeNavigation';

import * as reducers from './reducers';
import appMiddleware from './appMiddleware';

const configureStore = (preloadedState) => {
  let middleware;

  const appliedMiddleware = applyMiddleware(
    thunk,
    apiMiddleware,
    iframeNavigation,
    routerMiddleware(history),
    linkMiddleware(LinkedRenderStore),
    appMiddleware,
    LogRocket.reduxMiddleware()
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
    enableBatching(connectRouter(history)(combineReducers(reducers))),
    preloadedState,
    middleware
  );
};

export default configureStore;
