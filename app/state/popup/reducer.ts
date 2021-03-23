import { Node } from '@ontologies/core';
import { handleActions } from 'redux-actions';

import {
  SET_POPUP_RESOURCE,
  UNSET_POPUP_RESOURCE,
} from '../action-types';

export interface PopupObject {
  location: Record<string, string>;
  resource: Node | undefined;
}

const initialState = {
  location: {},
  resource: undefined,
};

const popup = handleActions<PopupObject>({
  [SET_POPUP_RESOURCE]: (_, { payload }) => ({
    location: payload.location,
    resource: payload.resource,
  }),
  [UNSET_POPUP_RESOURCE]: (state) => ({
    ...state,
    location: {},
    resource: undefined,
  }),
}, initialState);

export default popup;
