import { createAction } from 'redux-actions';

import {
  SIGN_IN_ACCOUNT_LOCKED,
  SIGN_IN_EMAIL_TAKEN,
  SIGN_IN_NO_PASSWORD,
  SIGN_IN_STEP_BACK,
  SIGN_IN_UNKNOWN_EMAIL,
  SIGN_IN_USER_CREATED,
  SIGN_IN_WRONG_PASSWORD,
} from '../action-types';

export const accountLocked = createAction(SIGN_IN_ACCOUNT_LOCKED);
export const emailTaken = createAction(SIGN_IN_EMAIL_TAKEN);
export const noPassword = createAction(SIGN_IN_NO_PASSWORD);
export const stepBack = createAction(SIGN_IN_STEP_BACK);
export const unknownEmail = createAction(SIGN_IN_UNKNOWN_EMAIL);
export const userCreated = createAction(SIGN_IN_USER_CREATED);
export const wrongPassword = createAction(SIGN_IN_WRONG_PASSWORD);

export default emailTaken;
