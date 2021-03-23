import { Node } from '@ontologies/core';
import { Action, createAction } from 'redux-actions';

import * as actions from '../action-types';

import { PopupObject } from './reducer';

export const setPopupResource = (subject: Node, location: Record<string, string>): Action<PopupObject> => ({
  payload: {
    location,
    resource: subject,
  },
  type: actions.SET_POPUP_RESOURCE,
});

export const unsetPopupResource = createAction(actions.UNSET_POPUP_RESOURCE);
