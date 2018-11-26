import { getCurrentUserType } from '../app/selectors';

import { STEPS } from './reducer';

export const signInGetErrors = state => state.getIn(['form', 'signIn', 'errors']);
export const signInGetStepRaw = state => state.getIn(['form', 'signIn', 'step']);
export const signInGetStep = state => (getCurrentUserType(state) === 'GuestUser' ? signInGetStepRaw(state) : STEPS.signUpCompleted);
export const signInHasBack = (state) => {
  const chain = state.getIn(['form', 'signIn', 'stepChain']);
  return chain && chain.size > 1;
};
export const signInSubject = state => state.getIn(['form', 'signIn', 'subject']);

export default signInGetStep;
