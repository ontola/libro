import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  SET_POPUP_RESOURCE,
  UNSET_POPUP_RESOURCE,
} from '../action-types';

const initialState = new Map({
  location: {},
  resource: undefined,
});

const sideBars = handleActions({
  [SET_POPUP_RESOURCE]: (state, { payload }) => new Map({
    location: payload.location,
    resource: payload.resource,
  }),
  [UNSET_POPUP_RESOURCE]: state => state.set('resource', undefined).set('location', {}),
}, initialState);

export default sideBars;
