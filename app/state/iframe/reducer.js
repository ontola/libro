import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { IFRAME_METADATA } from '../action-types';

const initialState = new Map({
  location: '',
  metadata: new Map(),
});

const generateIframeURL = (location) => {
  const url = new URL(window.location.origin + location.pathname + location.hash + location.search);
  url.searchParams.set('iframe', 'positive');
  return url.toString().replace(window.location.origin, '');
};

const motions = handleActions({
  [IFRAME_METADATA]: (state, { payload }) => state.setIn(['metadata', 'title'], payload.title),
  [LOCATION_CHANGE]: (state, { payload }) => state.set('location', generateIframeURL(payload)),
}, initialState);

export default motions;
