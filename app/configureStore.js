// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as reducers from './reducers/';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const initialState = {
  appData: [],
  activeMotion: 0
};

const middleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}
