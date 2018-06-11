import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux-immutable';

import {
  SIGN_IN_EMAIL_TAKEN,
  SIGN_IN_UNKNOWN_EMAIL,
  SIGN_IN_STEP_BACK,
  SIGN_IN_WRONG_PASSWORD,
} from '../action-types';

export const STEPS = {
  confirm: 'confirm',
  signIn: 'signIn',
  signUp: 'signUp',
  signUpCompleted: 'signUpCompleted',
};

function transitionTo(state, step) {
  return state
    .set('stepChain', (state.get('stepChain') || new List()).push(step))
    .set('step', step);
}

export default combineReducers({
  signIn: handleActions({
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
    [SIGN_IN_STEP_BACK]: (state) => {
      const prevChain = state.get('stepChain').pop();
      return transitionTo(state, prevChain.last())
        .set('stepChain', prevChain);
    },
    [SIGN_IN_UNKNOWN_EMAIL]: state => transitionTo(state, STEPS.confirm),
    [SIGN_IN_WRONG_PASSWORD]: (state) => {
      if (state.get('step') !== STEPS.signIn) {
        return transitionTo(state, STEPS.signIn);
      }

      return state.set();
    },
  }, transitionTo(new Map(), STEPS.signUp)),
});
