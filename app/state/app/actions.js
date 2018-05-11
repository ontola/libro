import { Map } from 'immutable';
import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const highlightResource = createAction(actions.HIGHLIGHT_RESOURCE);
export const setCurrentUser = createAction(
  actions.SET_CURRENT_USER,
  ({ actorType, primaryEmail }) => new Map({ actorType, primaryEmail })
);
export const setOrganization = createAction(actions.SET_ORGANIZATION);

export default setOrganization;
