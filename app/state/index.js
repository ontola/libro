import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';

import JsonApi from '../middleware/api';
import { linkMiddleware } from 'link-redux';
import LinkedRenderStore from '../helpers/LinkedRenderStore';
import { ARGU_API_URL_EXT } from '../config';
import * as reducers from './reducers';
import * as models from '../models';

import { reducer as search, reduxSearch } from 'redux-search';
import { reducer as form } from 'redux-form/immutable';

const apiMiddleware = new JsonApi({
  models: Object.values(models),
  apiBaseUrl: ARGU_API_URL_EXT,
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

  if (process.env.NODE_ENV === 'production') {
    middleware = compose(
      applyMiddleware(thunk, apiMiddleware, linkMiddleware(LinkedRenderStore)),
      reduxSearchConfig()
    );
  } else {
    middleware = compose(
      applyMiddleware(thunk, apiMiddleware, linkMiddleware(LinkedRenderStore)),
      reduxSearchConfig(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  const store = createStore(
    enableBatching(combineReducers(
      Object.assign({}, reducers, { search, form }))
    ),
    preloadedState,
    middleware
  );

  return store;
};

export default configureStore;
