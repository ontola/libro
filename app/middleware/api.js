import fetch from 'isomorphic-fetch';
import DataStore from '../helpers/DataStore';

let dataStore;
const API_ROOT = 'http://localhost:3000/api/';

const callApi = (endpoint) => {
  const fullUrl = API_ROOT + endpoint;

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

const parseResult = (jsonData, emitRecord) => {
  if (jsonData.data.constructor === Array) {
    jsonData.data.forEach(entity => {
      emitRecord(dataStore.formatEntity(entity));
    });
  } else {
    emitRecord(dataStore.formatEntity(jsonData.data));
  }
  if (jsonData.included) {
    jsonData.included.forEach(entity => emitRecord(dataStore.formatEntity(entity)));
  }
};

const middleware = store => next => action => {
  if (!action.payload.apiAction) {
    return next(action);
  }

  const {
    id,
    endpoint,
  } = action.payload;

  const emitRecord = (record) => {
    next({
      type: record.getIn(['apiDesc', 'actions', 'resource']),
      payload: {
        record,
      },
    });
  };

  const constructEndpoint = id ? `${endpoint}/${id}` : endpoint;

  next({
    type: action.type,
    payload: {
      loading: true,
      id,
    },
  });

  return callApi(constructEndpoint)
    .then(jsonData => parseResult(jsonData, emitRecord))
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
