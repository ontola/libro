import { SomeTerm } from '@ontologies/core';
import { createAction } from 'redux-actions';

import * as actions from '../action-types';

import { CurrentUser } from './reducer';

export type StateMap = Partial<CurrentUser>;

export const highlightResource = createAction(actions.HIGHLIGHT_RESOURCE);

export const setCurrentUser = createAction(
  actions.SET_CURRENT_USER,
  ({ actorType, anonymousID }: CurrentUser): StateMap => ({
    actorType,
    anonymousID,
  }),
);

export const setCurrentUserEmail = createAction(
  actions.SET_CURRENT_USER,
  (primaryEmail: string | SomeTerm): StateMap => ({
    primaryEmail: typeof primaryEmail === 'string' ? primaryEmail : primaryEmail.value,
  }),
);
