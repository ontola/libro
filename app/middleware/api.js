import fetch from 'isomorphic-fetch';

import { JsonApiDataStore } from './helpers/dataStore';
import * as actions from '../constants/actionTypes';

const API_ROOT = 'http://localhost:3000/api/';
const actionData = {
  [actions.FETCH_MOTIONS]: {
    endpoint: 'documents',
  },
};

const callApi = (endpoint) => {
  const fullUrl = API_ROOT + endpoint;
  const entities = new JsonApiDataStore();

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      json.data.map(entity => entities.addEntityToStore(entity));
      return entities;
    });
};

export default store => next => action => {
  if (typeof action === 'undefined') {
    return next(action);
  }

  if (actionData[action.type] === undefined) {
    return next(action);
  }

  const getActionData = actionData[action.type];
  const { endpoint } = getActionData;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  next({ type: 'API_REQUEST' });

  return callApi(endpoint).then(
    response => next({
      response,
      type: 'API_SUCCESS',
    }),
    error => next({
      type: 'API_FAILURE',
      error: error.message || 'Something bad happened',
    })
  );
};
