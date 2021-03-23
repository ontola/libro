import { Action, handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

export enum ActorType {
  GuestUser = 'GuestUser',
  ConfirmedUser = 'ConfirmedUser',
  UnconfirmedUser = 'UnconfirmedUser',
}

export interface CurrentUser {
  actorType: ActorType
  anonymousID: string | undefined;
  primaryEmail: string | undefined;
}

export type HighlightResource = string | undefined;

export interface AppState {
  [SET_CURRENT_USER]: CurrentUser
  [HIGHLIGHT_RESOURCE]: HighlightResource;
}

const initialState: AppState = {
  [HIGHLIGHT_RESOURCE]: undefined,
  [SET_CURRENT_USER]: {
    actorType: ActorType.GuestUser,
    anonymousID: undefined,
    primaryEmail: undefined,
  },
};

const collapsible = handleActions({
  [HIGHLIGHT_RESOURCE]: (state: AppState, { payload }: Action<HighlightResource>) => ({
    ...state,
    [HIGHLIGHT_RESOURCE]: payload,
  }),
  [LOCATION_CHANGE]: (state: AppState) => state[HIGHLIGHT_RESOURCE]
    ? {
      ...state,
      [HIGHLIGHT_RESOURCE]: undefined,
    }
    : state,
  [SET_CURRENT_USER]: (state: AppState, { payload }) => ({
    ...state,
    [SET_CURRENT_USER]: {
      ...state[SET_CURRENT_USER],
      ...payload as unknown as CurrentUser,
    },
  }),
}, initialState);

export default collapsible;
