import { Map } from 'immutable';
import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const highlightResource = createAction(actions.HIGHLIGHT_RESOURCE);

export const setCurrentUser = createAction(
  actions.SET_CURRENT_USER,
  ({ actorType, anonymousID }) => new Map({ actorType, anonymousID })
);
export const setCurrentUserEmail = createAction(
  actions.SET_CURRENT_USER,
  primaryEmail => new Map({
    primaryEmail: typeof primaryEmail === 'string' ? primaryEmail : primaryEmail.value,
  })
);
export const setOrganization = createAction(actions.SET_ORGANIZATION);

export default setOrganization;
