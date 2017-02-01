import { Map } from 'immutable';
import { reducer as form } from 'redux-form/immutable';

import { EMAIL_TAKEN } from '../action-types';

export default form.plugin({
  signIn: (state, action) => {
    switch (action.type) {
      case EMAIL_TAKEN: {
        return state.set('fields', state.get('fields').set('password', new Map()));
      }
      default: {
        return state;
      }
    }
  },
});
