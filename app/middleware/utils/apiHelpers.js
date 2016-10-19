import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { batchActions } from 'redux-batched-actions';

/**
 * Retrieve data from an API endpoint
 * @param {string} endpoint The url to retrieve the json response from
 * @return {string} Promise A promise that either fails are succeeds
 */
export const callApi = endpoint => fetch(endpoint)
  .then(response => response.json()
  .then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return Promise.resolve(json);
  });

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
 * Generates complete endpoint
 * @param {string} base Raw response from API
 * @param {object} payload Redux action payload that contains and endpoint and id string
 * @return {string} endpoint Endpoint
 */
export const getEndpoint = (base, { endpoint, id }) => base + (id ? `${endpoint}/${id}` : endpoint);

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
