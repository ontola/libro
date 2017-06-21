import { linkMiddleware } from 'link-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
import { reducer as search, reduxSearch } from 'redux-search';
import thunk from 'redux-thunk';

import { ARGU_API_URL_EXT } from '../config';
import LinkedRenderStore from '../helpers/LinkedRenderStore';
import { history } from '../helpers/history';
import JsonApi from '../middleware/api';
import iframeNavigation from '../middleware/iframeNavigation';
import * as models from '../models';

import * as reducers from './reducers';

const apiMiddleware = new JsonApi({
  apiBaseUrl: ARGU_API_URL_EXT,
  models: Object.values(models),
});

const configureStore = (preloadedState) => {
  let middleware;

  const reduxSearchConfig = () => (
    reduxSearch({
      // Configure redux-search by telling it which resources to index for searching
      resourceIndexes: {
        speeches: ['text'],
      },
      // This selector is responsible for returning each collection of searchable resources
      resourceSelector: (resourceName, state) => state.getIn([resourceName, 'items']),
      // Matches the search state name in the combineReducers function.
      searchStateSelector: state => state.get('search'),
    })
  );

  const appliedMiddleware = applyMiddleware(
    thunk,
    iframeNavigation,
    routerMiddleware(history),
    apiMiddleware,
    linkMiddleware(LinkedRenderStore)
  );

  if (process.env.NODE_ENV === 'production') {
    middleware = compose(
      appliedMiddleware,
      reduxSearchConfig()
    );
  } else {
    middleware = compose(
      appliedMiddleware,
      reduxSearchConfig(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  return createStore(
    enableBatching(combineReducers(
      Object.assign({}, reducers, { search }))
    ),
    preloadedState,
    middleware
  );
};

export default configureStore;
