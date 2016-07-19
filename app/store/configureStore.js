// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    apiMiddleware,
    thunk
  ),
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

export default store;
