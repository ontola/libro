import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux-immutable';

import {
  SIGN_IN_EMAIL_TAKEN,
  SIGN_IN_UNKNOWN_EMAIL,
  SIGN_IN_SHOW_FORM,
  SIGN_IN_STEP_BACK,
  SIGN_IN_WRONG_PASSWORD,
} from '../action-types';

import messages from './messages';

export const STEPS = {
  confirm: 'confirm',
  signIn: 'signIn',
  signUp: 'signUp',
  signUpCompleted: 'signUpCompleted',
};

function transitionTo(state, step, errors = new Map()) {
  return state
    .set('stepChain', (state.get('stepChain') || new List()).push(step))
    .set('step', step)
    .set('errors', errors);
}

export default combineReducers({
  signIn: handleActions({
    // TODO: Originally written for redux forms, needs to be updated
    // [actionTypes.CHANGE]: (state, action) => {
    //   if (typeof state === 'undefined' || state.get('step') !== STEPS.confirm ||
    // action.meta.field !== 'email') {
    //     return state;
    //   }
    //
    //   return transitionTo(state, STEPS.signUp);
    // },
    [LOCATION_CHANGE]: (state, action) => {
      if (typeof state === 'undefined' || typeof state.get('step') !== 'undefined') {
        return state;
      }

      switch (action.payload.pathname) {
        case '/u/sign_in':
          return transitionTo(state, STEPS.signIn);
        case '/u/sign_up':
          return transitionTo(state, STEPS.signUp);
        case '/u/setup':
          return transitionTo(state, STEPS.signUpCompleted);
        default:
          return state;
      }
    },
    [SIGN_IN_EMAIL_TAKEN]: state => transitionTo(state, STEPS.signIn),
    [SIGN_IN_SHOW_FORM]: (state, { payload }) => transitionTo(state, STEPS.signUp)
      .set('subject', payload),
    [SIGN_IN_STEP_BACK]: (state) => {
      const prevChain = state.get('stepChain').pop();
      const subjectState = prevChain.size === 1 ? state.set('subject', undefined) : state;
      return transitionTo(subjectState, prevChain.last())
        .set('stepChain', prevChain);
    },
    [SIGN_IN_UNKNOWN_EMAIL]: state => transitionTo(state, STEPS.confirm),
    [SIGN_IN_WRONG_PASSWORD]: (state) => {
      if (state.get('step') !== STEPS.signIn) {
        return transitionTo(state, STEPS.signIn);
      }

      return state.set('errors', new Map({
        password: [messages.invalidPassword],
      }));
    },
  }, transitionTo(new Map(), STEPS.signUp)),
});
