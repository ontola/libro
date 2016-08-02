import fetch from 'isomorphic-fetch';
import { batchActions } from 'redux-batched-actions';

import DataStore from '../helpers/DataStore';
import { ARGU_API_PROXIED, ARGU_API_BASE } from '../constants/config';

let dataStore;

const callApi = (endpoint) => {
  const fullUrl = ARGU_API_PROXIED + ARGU_API_BASE + endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    });
};

const parseResult = (jsonData, emitRecord, next) => {
  const actions = [];

  if (jsonData.data.constructor === Array) {
    jsonData.data.forEach(entity => {
      actions.push(emitRecord(dataStore.formatEntity(entity)));
    });
  } else {
    actions.push(emitRecord(dataStore.formatEntity(jsonData.data)));
  }
  if (jsonData.included) {
    jsonData.included.forEach(entity => actions.push(emitRecord(dataStore.formatEntity(entity))));
  }

  next(batchActions(actions));
};

const middleware = store => next => action => {
  if (!action.payload.apiAction) {
    return next(action);
  }

  const {
    id,
    endpoint,
  } = action.payload;

  const constructEndpoint = id ? `${endpoint}/${id}` : endpoint;

  const emitRecord = (record) => ({
    type: record.getIn(['apiDesc', 'actions', 'resource']),
    payload: {
      record,
    },
  });

  next({
    type: action.type,
    payload: {
      loading: true,
      id,
    },
  });

  return callApi(constructEndpoint)
    .then(jsonData => parseResult(jsonData, emitRecord, next))
    .catch(error => next({
      type: action.type,
      error: true,
      payload: error.message || 'Something bad happened',
    }));
};

export default models => {
  dataStore = new DataStore(models);
  return middleware;
};
