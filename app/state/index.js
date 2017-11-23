import { linkMiddleware } from 'link-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
// import { reducer as search, reduxSearch } from 'redux-search';
import thunk from 'redux-thunk';

import LinkedRenderStore from '../helpers/LinkedRenderStore';
import history from '../helpers/history';
import iframeNavigation from '../middleware/iframeNavigation';

import * as reducers from './reducers';

const configureStore = (preloadedState) => {
  let middleware;

  // const reduxSearchConfig = () => (
  //   reduxSearch({
  //     // Configure redux-search by telling it which resources to index for searching
  //     resourceIndexes: {
  //       speeches: ['text'],
  //     },
  //     // This selector is responsible for returning each collection of searchable resources
  //     resourceSelector: (resourceName, state) => state.getIn([resourceName, 'items']),
  //     // Matches the search state name in the combineReducers function.
  //     searchStateSelector: state => state.get('search'),
  //   })
  // );

  const appliedMiddleware = applyMiddleware(
    thunk,
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
