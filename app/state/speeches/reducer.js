import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import Speech from 'models/Speech';

import {
  GET_SPEECH,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const newSpeechUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Speech({ id, loading: true });
};

const speeches = handleActions({
  [GET_SPEECH]: (state, { payload }) => {
    const record = payload.record || newSpeechUnlessExists(state, payload.id);
    return state.setIn(['items', record.id], record);
  },
}, initialState);

export default speeches;
