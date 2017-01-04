import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { batchActions } from 'redux-batched-actions';

/**
 * Generates complete endpoint
 * @param {string} base Raw response from API
 * @param {object} payload Redux action payload that contains and endpoint and id string
 * @return {string} endpoint Endpoint
 */
export const getEndpoint = (base, { endpoint, id }) => base + (id ? `${endpoint}/${id}` : endpoint);

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
  // Todo: set clientToken by logging in.
  const clientToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOiIyMDE3LTAxLTAyVDE2OjQ0OjQ2LjU2NzIyWiIsInVzZXIiOnsidHlwZSI6InVzZXIiLCJpZCI6OTUsImVtYWlsIjoiYXJ0aHVyQGFyZ3UuY28ifX0.WalOw-g3BTDw4w6v39wOfyBnXuMFwv5-uNjNkfzrRcQDN_nydx0uo-tuSDLmK6LJBtcFjxAxoB5ncdj81TBHIQ';
  let body;
  if (typeof method !== 'undefined' && method !== 'GET') {
    body = {
      data: {
        type,
        attributes,
      },
    };
  }
  return fetch(endpoint, {
    method: method || 'GET',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json()
    .then(json => ({ json, response })))
    .then(({ json, response }) => {
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
  const formatEntity = entity => action(dataStore.formatEntity(entity));
  return batchActions(entities.map(formatEntity));
};
