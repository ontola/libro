import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

const initialState = new Map({
  [SET_CURRENT_USER]: new Map({
    actorType: 'GuestUser',
    anonymousID: undefined,
    primaryEmail: undefined,
  }),
});

const collapsible = handleActions({
  [HIGHLIGHT_RESOURCE]: (state, { payload }) => state.set(HIGHLIGHT_RESOURCE, payload),
  [LOCATION_CHANGE]: state => (state.get(HIGHLIGHT_RESOURCE)
    ? state.set(HIGHLIGHT_RESOURCE, undefined)
    : state),
  [SET_CURRENT_USER]: (state, { payload }) => state.set(
    SET_CURRENT_USER,
    state.get(SET_CURRENT_USER).merge(payload)
  ),
}, initialState);

export default collapsible;
