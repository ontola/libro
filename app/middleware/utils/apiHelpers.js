import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { batchActions } from 'redux-batched-actions';

import { safeCredentials } from 'helpers/arguHelpers';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

const headers = () => ({
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/json',
  },
});

/**
 * Generates complete endpoint
 * @param {string} base Raw response from API
 * @param {object} payload Redux action payload that contains and endpoint and id string
 * @return {string} endpoint Endpoint
 */
export const getEndpoint = (base, { arguModel, endpoint, id }) => {
  if (arguModel) {
    return (id ? `${endpoint}/${id}` : endpoint);
  }
  return base + (id ? `${endpoint}/${id}` : endpoint);
};

/**
 * Retrieve data from an API endpoint
 * @param {string} apiBaseUrl The url base to retrieve the json response from
 * @param {object} action The action to create the request for
 * @return {string} Promise A promise that either fails are succeeds
 */
export const callApi = (apiBaseUrl, { payload }) => {
  const { attributes, request, type } = payload;
  const method = request && request.method;
  const href = request && request.href;
  const endpoint = href || getEndpoint(apiBaseUrl, payload);

  let body;
  if (typeof method !== 'undefined' && method !== 'GET') {
    body = {
      data: {
        attributes,
        type,
      },
    };
  }
  return fetch(endpoint, safeCredentials({
    body: JSON.stringify(body),
    credentials: 'same-origin',
    method: method || 'GET',
    ...headers(),
  }))
    .then(response => response.json()
      .then(json => ({ json, response })))
    .then(({ json, response }) => {
      LinkedRenderStore.api.processor.worker.postMessage({
        data: {
          body: JSON.stringify(json),
          headers: {
            Accept: response.headers.get('Accept'),
            'Content-Type': response.headers.get('Content-Type'),
          },
          status: response.status,
          url: response.url,
        },
        method: 'DATA_ACQUIRED',
        params: {
          iri: response.url,
        },
      });
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    });
};

/**
 * Yields entities from raw API response
 * @param {object} json Raw response from API
 * @return {array} entities An array that contains all entities
 */
export const yieldEntities = (json) => {
  const entities = [];
  const addToEntities = entity => entities.push(entity);
  const { data, included } = json;

  if (data.constructor === Array) {
    data.forEach(addToEntities);
  } else {
    entities.push(data);
  }

  if (included) {
    included.forEach(addToEntities);
  }

  return entities;
};

/**
 * Format entities and batch actions
 * @param {object} dataStore A DataStore object
 * @param {array} entities An array that contains unformatted raw entities
 * @param {function} action Redux action creator for entities
 * @return {object} actions An array of actions that can be dispatched in a batch
 */
export const parseResult = (dataStore, entities, action) => {
  const formatEntity = (entity) => {
    const formatted = dataStore.formatEntity(entity);
    return formatted && action(formatted);
  };
  return batchActions(entities.map(formatEntity).filter(e => e));
};
