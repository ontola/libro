import { createAction } from 'redux-actions';
import * as action from '../constants/actionTypes';

const setCard = createAction(action.SET_HOVER_CARD);
const removeCard = createAction(action.REMOVE_HOVER_CARD);

export {
  setCard,
  removeCard,
};
