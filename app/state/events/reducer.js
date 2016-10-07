import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import Event from 'models/Event';

import {
  GET_EVENT,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const newEventUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Event({ id, loading: true });
};

const events = handleActions({
  [GET_EVENT]: (state, { error, payload }) => {
    const record = payload.record || newEventUnlessExists(state, payload.id);

    if (error) {
      return state.deleteIn(['items', payload.id]);
    }

    return state.setIn(['items', record.id], record);
  },
}, initialState);

export default events;
