import fetch from 'isomorphic-fetch';

import { formatEntities } from './helpers/dataStore';
import * as actions from '../constants/actionTypes';

const API_ROOT = 'http://localhost:3000/api/';
const actionData = {
  [actions.GET_MOTIONS_REQUEST]: {
    endpoint: 'documents',
  },
  [actions.GET_PERSONS_REQUEST]: {
    endpoint: 'persons',
  },
};

const callApi = (endpoint) => {
  const fullUrl = API_ROOT + endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const entities = json.data.map(entity => formatEntities(entity));

      return entities;
    });
};

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  const MAX_NUMBER_OF_TYPES = 3;

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types } = callAPI;

  if (!Array.isArray(types) || types.length !== MAX_NUMBER_OF_TYPES) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const getActionData = actionData[types[0]];
  const { endpoint } = getActionData;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint).then(
    payload => next(actionWith({
      payload,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }))
  );
};
