import { createAction } from 'redux-actions';
import * as actions from '../constants/actionTypes';

export const resetErrorMessage = () => createAction(actions.RESET_ERROR_MESSAGE);
