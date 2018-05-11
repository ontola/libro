import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes, reducer as form } from 'redux-form/immutable';

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

function unsetField(state, field) {
  if (!state.get('fields')) {
    return state;
  }

  return state.set('values', state.get('values').set(field, undefined));
}

const clearPassword = state => unsetField(state, 'password');
const clearTerms = state => unsetField(state, 'acceptTerms');

const setPassword = state => state.set('fields', state.get('fields').setIn(['values', 'password'], state.getIn(['fieds', 'password']) || new Map()));
const setTerms = state => state.setIn(['values', 'acceptTerms'], true);

function transitionTo(state, step) {
  const nextState = state
    .set('stepChain', (state.get('stepChain') || new List()).push(step))
    .set('step', step);

  switch (step) {
    case STEPS.confirm:
      return setTerms(clearPassword(nextState));
    case STEPS.signUp:
      return clearTerms(clearPassword(nextState));
    case STEPS.signIn:
      return clearTerms(setPassword(nextState));
    case STEPS.signUpCompleted:
      return clearTerms(clearPassword(nextState));
    default:
      return nextState;
  }
}

export default form.plugin({
  signIn: (state, action) => {
    switch (action.type) {
      case SIGN_IN_EMAIL_TAKEN: {
        return transitionTo(state, STEPS.signIn);
      }
      case SIGN_IN_UNKNOWN_EMAIL: {
        return transitionTo(state, STEPS.confirm);
      }
      case SIGN_IN_STEP_BACK: {
        const prevChain = state.get('stepChain').pop();
        return transitionTo(state, prevChain.last())
          .set('stepChain', prevChain);
      }
      case SIGN_IN_WRONG_PASSWORD: {
        if (state.get('step') !== STEPS.signIn) {
          return transitionTo(state, STEPS.signIn);
        }

        return state.set();
      }
      case actionTypes.CHANGE: {
        if (typeof state === 'undefined' || state.get('step') !== STEPS.confirm || action.meta.field !== 'email') {
          return state;
        }

        return transitionTo(state, STEPS.signUp);
      }
      case LOCATION_CHANGE: {
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
      }
      default: {
        if (typeof state === 'undefined' || typeof state.get('step') !== 'undefined') {
          return state;
        }

        return transitionTo(state, STEPS.signUp);
      }
    }
  },
});
