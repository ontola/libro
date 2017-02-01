import { createAction } from 'redux-actions';

import { EMAIL_TAKEN } from '../action-types';

export const emailTaken = createAction(EMAIL_TAKEN);
