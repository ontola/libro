import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { createAction } from 'redux-actions';
import { ELASTICSEARCH_DOCUMENT_BASE } from '../../config';
import * as actions from '../action-types';

const callApi = (endpoint) => {
  const fullUrl = ELASTICSEARCH_DOCUMENT_BASE + endpoint;

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

const apiGetDocument = (id) => (dispatch) => {
  dispatch({
    type: actions.FETCH_DOCUMENT_REQUEST,
    payload: {
      loading: true,
    },
  });

  return callApi(id).then(jsonData => dispatch({
    type: actions.FETCH_DOCUMENT_SUCCESS,
    payload: jsonData,
  })).catch(error => dispatch({
    type: actions.FETCH_DOCUMENT_FAILURE,
    error: true,
    payload: error.message || 'Something bad happened',
  }));
};


const toggleDrawer = createAction(actions.TOGGLE_DRAWER);
const setHitCount = createAction(actions.SET_HIT_COUNT);

export {
  apiGetDocument,
  toggleDrawer,
  setHitCount,
};
