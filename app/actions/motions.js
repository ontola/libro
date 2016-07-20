import * as actions from '../constants/actionTypes';
import { createAction } from 'redux-actions';

const apiGetMotions = createAction(actions.FETCH_MOTIONS);

export {
  apiGetMotions,
};
