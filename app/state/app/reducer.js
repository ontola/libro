import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { SET_CURRENT_USER, SET_ORGANIZATION, HIGHLIGHT_RESOURCE } from '../action-types';

const initialState = new Map({
  [SET_CURRENT_USER]: new Map({
    actorType: 'GuestUser',
    primaryEmail: undefined,
  }),
  [SET_ORGANIZATION]: NS.app('o/argu'),
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
  [SET_ORGANIZATION]: (state, { payload }) => state.set(SET_ORGANIZATION, payload),
}, initialState);

export default collapsible;
