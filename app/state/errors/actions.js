import { createAction } from 'redux-actions';
import * as actions from '../action-types';

export const resetErrorMessage = createAction(actions.RESET_ERROR_MESSAGE);
