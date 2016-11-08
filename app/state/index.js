import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { combineReducers } from 'redux-immutable';
<<<<<<< 86608004f8433a0837bd0fe4ac067113bb7a18df
import { reducer as searchLocal, reduxSearch } from 'redux-search';
import { reducer as formReducer } from 'redux-form/immutable';

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
      applyMiddleware(thunk, apiMiddleware),
      reduxSearchConfig()
    );
  } else {
    middleware = compose(
      applyMiddleware(thunk, apiMiddleware),
      reduxSearchConfig(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  }

  const store = createStore(
    enableBatching(combineReducers([...reducers, searchLocal, form])),
    preloadedState,
    middleware
  );

  return store;
};

export default configureStore;
