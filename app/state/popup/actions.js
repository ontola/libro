import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const setPopupResource = (subject, location) => ({
  payload: {
    location,
    resource: subject,
  },
  type: actions.SET_POPUP_RESOURCE,
});
export const unsetPopupResource = createAction(actions.UNSET_POPUP_RESOURCE);
