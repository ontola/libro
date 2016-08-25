import { createAction } from 'redux-actions';
import * as actions from '../action-types';

export const voteAction = createAction(actions.SET_VOTE);
